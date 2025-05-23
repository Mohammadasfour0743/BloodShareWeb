import { observer } from 'mobx-react-lite';
import { LoginForm } from '../presenter/LoginForm';
import { Navigate } from 'react-router';

const LoginPage = observer(function LoginPage({ model }) {
  if (model.username === undefined || !model.ready) {
    return <div>Loading...</div>;
  }
  if (model.username) {
    return <Navigate to="/hospitalProfile" />;
  }

  return <LoginForm />;
});
export default LoginPage;
