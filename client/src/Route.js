import ResetPassword from "./containers/ResetPassword";


<UnauthenticatedRoute
  path="/login/reset"
  exact
  component={ResetPassword}
  props={childProps}
/>