import FullPageGoalView from "~/components/full-goal-page";

export default function PhotoModal({
  params: { id: goalId },
}: {
  params: { id: string };
}) {
  return <FullPageGoalView goalId={goalId} />;
}
