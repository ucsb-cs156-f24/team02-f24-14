import BasicLayout from "main/layouts/BasicLayout/BasicLayout";
import { Navigate } from "react-router-dom";
import { useBackendMutation } from "main/utils/useBackend";
import { toast } from "react-toastify";
import HelpRequestForm from "main/components/HelpRequest/HelpRequestForm";

export default function HelpRequestCreatePage({ storybook = false }) {
  const objectToAxiosParams = (helpRequest) => ({
    url: "/api/HelpRequests/post",
    method: "POST",
    params: {
      requesterEmail: helpRequest.requesterEmail,
      teamId: helpRequest.teamId,
      tableOrBreakoutRoom: helpRequest.tableOrBreakoutRoom,
      explanation: helpRequest.explanation,
      requestTime: helpRequest.requestTime,
      solved: helpRequest.solved,
    },
  });

  const onSuccess = (helpRequest) => {
    toast(
      `New Help Request Created - id: ${helpRequest.id} requester email: ${helpRequest.requesterEmail}`,
    );
  };

  const mutation = useBackendMutation(
    objectToAxiosParams,
    { onSuccess },
    // Stryker disable next-line all : hard to set up test for caching
    ["/api/HelpRequests/all"],
  );

  const { isSuccess } = mutation;

  const onSubmit = async (data) => {
    mutation.mutate(data);
  };

  if (isSuccess && !storybook) {
    return <Navigate to="/helprequests" />;
  }

  return (
    <BasicLayout>
      <div className="pt-2">
        <h1>Create New HelpRequest</h1>

        <HelpRequestForm submitAction={onSubmit} />
      </div>
    </BasicLayout>
  );
}
