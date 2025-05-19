import { ParagraphNode } from "lexical";
import { ListNode, ListItemNode } from "@lexical/list";

import Editor from "./Editor";
import MyParagraph from "./MyParagraph";

import "./App.css";
import TestButtons from "./components/TestButtons";

const theme = {
  paragraph: "editor_paragraph",
  list: {
    nested: {
      listitem: "editor_nested-listitem",
    },
    ol: "editor_list-ol",
    ul: "editor_list-ul",
    listitem: "editor_listItem",
    listitemChecked: "editor_listItemChecked",
    listitemUnchecked: "editor_listItemUnchecked",
  },
};

function onError(error) {
  console.error(error);
}

function App() {
  const config = {
    namespace: "BibleEditor",
    nodes: [
      ListNode,
      ListItemNode,
      MyParagraph,
      {
        replace: ParagraphNode,
        with: () => {
          return new MyParagraph();
        },
        withKlass: MyParagraph,
      },
    ],
    theme,
    onError,
  };

  return <Editor config={config} />;
}

export default App;
