import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary";

import MyListPlugin from "./plugins/MyListPlugin/MyListPlugin";
import MyParagraphPlugin from "./plugins/MyParagraphPlugin/MyParagraphPlugin";
import TestButtons from "./components/TestButtons";

import "./Editor.css";

const Editor = ({ config }) => {
  return (
    <>
      <LexicalComposer initialConfig={config}>
        <div className="app">
          <TestButtons />

          <div className="editor_container">
            <RichTextPlugin
              contentEditable={
                <ContentEditable
                  className="editor"
                  aria-placeholder={"Enter some text..."}
                  placeholder={
                    <div className="editor_placeholder">Enter some text...</div>
                  }
                />
              }
              ErrorBoundary={LexicalErrorBoundary}
            />

            <MyListPlugin />
            <MyParagraphPlugin />

            {/* IDEA: we can use DOM events in Lexical */}

            <HistoryPlugin />

            <AutoFocusPlugin />
          </div>
        </div>
      </LexicalComposer>
    </>
  );
};

export default Editor;
