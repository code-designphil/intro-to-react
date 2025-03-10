import { useState, Suspense, use } from "react";
import { useQuery } from "@tanstack/react-query";
import { usePriceFormat } from "../hooks/i18n.js";
import { createLazyFileRoute } from "@tanstack/react-router";
import getPastOrders from "../api/getPastOrders.js";
import getPastOrder from "../api/getPastOrder.js";
import Modal from "../components/modal.jsx";
import ErrorBoundary from "../ErrorBoundary.jsx";

export const Route = createLazyFileRoute("/past")({
  component: ErrorBoundaryWrappedPastOrdersRoute,
});

function ErrorBoundaryWrappedPastOrdersRoute() {
  const [page, setPage] = useState(1);
  const promise = useQuery({
    queryKey: ["past-orders", page],
    queryFn: () => getPastOrders(page),
    staleTime: 1000 * 30,
  }).promise;

  return (
    <ErrorBoundary>
      <Suspense
        fallback={
          <div className="past-orders">
            <h2>Loading Past Orders...</h2>
          </div>
        }
      >
        <Past promise={promise} page={page} setPage={setPage} />
      </Suspense>
    </ErrorBoundary>
  );
}

function Past({ promise, page, setPage }) {
  const data = use(promise);
  const [focusedOrder, setFocusedOrder] = useState();
  const { isLoading: isLoadingPastOrder, data: pastOrderData } = useQuery({
    queryKey: ["past-order", focusedOrder],
    queryFn: () => getPastOrder(focusedOrder),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: !!focusedOrder,
  });
  const i18nPriceFormatter = usePriceFormat();

  return (
    <div className="past-orders">
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Date</td>
            <td>Time</td>
          </tr>
        </thead>
        <tbody>
          {data.map((order) => (
            <tr key={order.order_id}>
              <td>
                <button onClick={() => setFocusedOrder(order.order_id)}>
                  {order.order_id}
                </button>
              </td>
              <td>{order.date}</td>
              <td>{order.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pages">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <button disabled={data.length < 10} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
      {focusedOrder ? (
        <Modal>
          <h2>Order #{focusedOrder}</h2>
          {!isLoadingPastOrder ? (
            <table>
              <thead>
                <tr>
                  <td>Image</td>
                  <td>Name</td>
                  <td>Size</td>
                  <td>Quantity</td>
                  <td>Price</td>
                  <td>Total</td>
                </tr>
              </thead>
              <tbody>
                {pastOrderData.orderItems.map((pizza) => (
                  <tr key={`${pizza.pizzaTypeId}_${pizza.size}`}>
                    <td>
                      <img src={pizza.image} alt="" />
                    </td>
                    <td>{pizza.name}</td>
                    <td>{pizza.size}</td>
                    <td>{pizza.quantity}</td>
                    <td>{i18nPriceFormatter.format(pizza.price)}</td>
                    <td>{i18nPriceFormatter.format(pizza.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={() => setFocusedOrder()}>Close</button>
        </Modal>
      ) : null}
    </div>
  );
}
