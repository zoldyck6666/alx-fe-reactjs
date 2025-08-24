import { QueryClient, QueryClientProvider } from "react-query";
import RegistrationForm from "./components/RegistrationForm";
import FormikForm from "./components/formikForm";
import PostsComponent from "./components/PostsComponent"; // we’ll create this

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RegistrationForm />
      <FormikForm />
      <PostsComponent />
    </QueryClientProvider>
  );
}

export default App;
