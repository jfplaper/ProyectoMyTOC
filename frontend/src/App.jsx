import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./contexts/AuthContext";
import { ClinicsProvider } from "./contexts/ClinicsContext";
import { ThreadsProvider } from "./contexts/ThreadsContext";
import { CommentsProvider } from "./contexts/CommentsContext";
import { EventsProvider } from "./contexts/EventsContext";
import { Toaster } from 'sonner';

const App = () => {
  return (
    <ClinicsProvider>
      <ThreadsProvider>
        <CommentsProvider>
          <EventsProvider>
            <AuthProvider>
              <Toaster position="top-right" richColors />
              <RouterProvider router={router} />
            </AuthProvider>
          </EventsProvider>
        </CommentsProvider>
      </ThreadsProvider>
    </ClinicsProvider>
  );
};

export default App;
