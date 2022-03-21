import { useEffect, useState } from "react";
import { Text, Title, Wrap, Type } from "./DirectoryCard.style";

const DirectoryCard = ({ id, name, type, editForm, getSelectedId }: any) => {
  const [action, setAction] = useState<string>("");

  useEffect(() => {
    if (type === "Расширяемый") {
      setAction("+ Добавить");
    } else if (type === "Нерасширяемый") {
      setAction("Посмотреть");
    }
  }, []);

  return (
    <>
      <Wrap>
        <Title>{name}</Title>
        <Text
          onClick={() => {
            editForm();
            getSelectedId(id);
          }}
        >
          {action}
        </Text>
        <Type>{type}</Type>
      </Wrap>
    </>
  );
};

export default DirectoryCard;
