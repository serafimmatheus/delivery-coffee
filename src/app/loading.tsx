import { ArrowsClockwise } from "@phosphor-icons/react/dist/ssr";

const Loading = () => {
  return (
    <div className="animate-spin">
      <ArrowsClockwise size={32} color="#e2e2" />
    </div>
  );
};

export default Loading;
