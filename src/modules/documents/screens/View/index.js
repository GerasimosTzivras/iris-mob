import { Suspense, lazy } from "react";

const ViewScreen = lazy(() => import("./ViewScreen"));

function withSuspense(View, FallBack) {
  return (props) => (
    <Suspense fallback={<LoadingFallback />}>
      <View {...props} />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div>
      <p>Loading...</p>
    </div>
  );
}

export default withSuspense(ViewScreen);
