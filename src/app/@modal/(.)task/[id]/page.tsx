import FullPageGoalView from "~/components/full-goal-page";
import { Modal } from "./modal";

export default function PhotoModal({
  params: { id: goalId },
}: {
  params: { id: string };
}) {
  return (
    <Modal>
      <FullPageGoalView goalId={goalId} />
    </Modal>
  );
}
