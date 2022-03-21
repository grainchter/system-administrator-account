import { useState } from "react";
import {
  Wrap,
  PostDate,
  PostImg,
  PostTitle,
  ActionWrap,
  DataWrap,
  PostAction,
  Container,
  ComponentWrap,
  ShowAll,
} from "./NewsPost.style";

import { changeValue } from "../../../store/clickedStore";
import { useDispatch } from "react-redux";

const NewsPost = ({
  newsData,
  editForm,
  deleteForm,
  logicGetUserData,
}: any) => {
  const [showAll, setShowAll] = useState<number | undefined>(3);

  const dispatch = useDispatch();

  const getFormData = (id: string, title: string, content: string) => {
    dispatch(
      changeValue({
        selectedNews: {
          id: id,
          title: title,
          content: content,
        },
      })
    );
  };

  return (
    <>
      <ComponentWrap>
        {newsData
          .slice(0, showAll)
          .map(({ id, createdAt, title, fileId, content }: any) => (
            <Wrap key={id}>
              <PostImg src={fileId} />
              <Container>
                <DataWrap>
                  <PostDate>{createdAt}</PostDate>
                  <PostTitle>{title}</PostTitle>
                </DataWrap>
                <ActionWrap>
                  <PostAction
                    onClick={() => {
                      editForm();
                      getFormData(id, title, content);
                    }}
                  >
                    edit
                  </PostAction>
                  <PostAction
                    onClick={() => {
                      getFormData(id, title, content);
                      deleteForm();
                      logicGetUserData();
                    }}
                  >
                    del
                  </PostAction>
                </ActionWrap>
              </Container>
            </Wrap>
          ))}
      </ComponentWrap>
      <>
        {showAll === 3 && (
          <ShowAll
            onClick={() => {
              setShowAll(newsData.length);
            }}
          >
            Показать все
          </ShowAll>
        )}
        {showAll === newsData.length && (
          <ShowAll
            onClick={() => {
              setShowAll(3);
            }}
          >
            Скрыть
          </ShowAll>
        )}
      </>
    </>
  );
};

export default NewsPost;
function dispatch(arg0: { payload: string; type: string }) {
  throw new Error("Function not implemented.");
}
