import useBackspaceList from "./hooks/useBackspaceList";
import useCreateList from "./hooks/useCreateList";
import useIndentList from "./hooks/useIndentList";
import useOutdentList from "./hooks/useOutdentList";

const MyListPlugin = () => {
  useCreateList();
  useIndentList();
  useOutdentList();
  useBackspaceList();

  return null;
};

export default MyListPlugin;
