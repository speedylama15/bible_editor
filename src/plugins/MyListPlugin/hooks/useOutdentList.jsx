import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  COMMAND_PRIORITY_HIGH,
  KEY_TAB_COMMAND,
  OUTDENT_CONTENT_COMMAND,
} from "lexical";

const useOutdentList = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    return editor.registerCommand(
      KEY_TAB_COMMAND,
      (e) => {
        e.preventDefault();

        if (!e.shiftKey) return false;

        editor.update(() => {
          editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined);
        });

        return true;
      },
      COMMAND_PRIORITY_HIGH
    );
  }, [editor]);
  return null;
};

export default useOutdentList;
