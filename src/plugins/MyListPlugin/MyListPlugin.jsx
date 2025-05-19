import useCreateList from "./hooks/useCreateList";
import useIndentList from "./hooks/useIndentList";
import useOutdentList from "./hooks/useOutdentList";

const MyListPlugin = () => {
  useCreateList();
  useIndentList();
  useOutdentList();

  return null;
};

export default MyListPlugin;
