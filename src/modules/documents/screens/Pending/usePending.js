import { startTransition } from "react";
import { useQuery } from "../../../../shared/hooks/useQuery";
import { useAuth } from "../../../../screens/Login/utils/store";
import DocumentsApi from "../../../../screens/documents/api/api";

export default function usePending() {
  const { token, profile } = useAuth();
  startTransition(() => {
    const query = useQuery(
      ["documents", "pending", "outbox"],
      async () =>
        await new DocumentsApi(
          token,
          profile.department.id,
          profile.title.id
        ).queries.getPendingDocuments()
    );

    // Return the data from the useQuery call
    return {
      documents: query.data,
      // pagination: query.pagination,
    };
  });
}
