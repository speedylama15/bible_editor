import { useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $getNodeByKey, COMMAND_PRIORITY_EDITOR, createCommand } from "lexical";

export const DATA_ATTRIBUTE_COMMAND = createCommand("DATA_ATTRIBUTE_COMMAND");

// REVIEW: this command is used for setting indentation value
// IDEA: maybe I can make this more extensible
export const useDataAttributeCommand = () => {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      DATA_ATTRIBUTE_COMMAND,
      (payload) => {
        const { key, attributeValue } = payload;

        const node = $getNodeByKey(key);

        if (node) {
          const writableNode = node.getWritable();
          writableNode.setCustomIndent(attributeValue);
          writableNode.markDirty();

          return true;
        }

        return false;
      },
      COMMAND_PRIORITY_EDITOR
    );
  }, [editor]);

  return null;
};

export default useDataAttributeCommand;
