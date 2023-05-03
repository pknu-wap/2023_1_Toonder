import React, { useState } from 'react';
import styled from 'styled-components';

const Tag = () => {
  const [tagItem, setTagItem] = useState('');
  const [tagList, setTagList] = useState([]);
  const whitelist = ['액션', '멜로', '판타지', '코믹'];

  const onKeyPress = (e) => {
    if (e.target.value.length !== 0 && e.key === 'Enter') {
      const tagValue = e.target.value.trim();
      if (whitelist.includes(tagValue) && !tagList.includes(tagValue)) {
        // whitelist에 지정된 단어들만 입력 가능하도록 검사
        submitTagItem();
      } else {
        e.target.value = '';
      }
    }
  };
  const submitTagItem = () => {
    let updatedTagList = [...tagList];
    updatedTagList.push(tagItem);
    setTagList(updatedTagList);
    setTagItem('');
  };

  const deleteTagItem = (e) => {
    const deleteTagItem = e.target.parentElement.firstChild.innerText;
    const filteredTagList = tagList.filter(
      (tagItem) => tagItem !== deleteTagItem
    );
    setTagList(filteredTagList);
  };

  return (
    <WholeBox>
      <TagBox>
        {tagList.map((tagItem, index) => {
          return (
            <TagItem key={index}>
              <Text>{tagItem}</Text>
              <Button onClick={deleteTagItem}>X</Button>
            </TagItem>
          );
        })}
        <TagInput
          type="text"
          placeholder="Press enter to add tags"
          tabIndex={2}
          onChange={(e) => setTagItem(e.target.value)}
          value={tagItem}
          onKeyPress={onKeyPress}
        />
      </TagBox>
    </WholeBox>
  );
};

const WholeBox = styled.div`
  padding: 10px;
  height: 100vh;
`;

const TagBox = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 50px; /* 고정된 높이 */
  margin: 10px;
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;

  &:focus-within {
    border-color: white;
  }
`;

const TagItem = styled.div`
  display: flex;
  align-items: center;

  margin: 5px;
  padding: 5px;
  background-color: tomato;
  border-radius: 5px;
  color: white;
  font-size: 23px;
`;

const Text = styled.span``;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  background-color: white;
  border-radius: 50%;
  color: tomato;
`;

const TagInput = styled.input`
  display: inline-flex;
  min-width: 150px;
  height: 200px;
  background: white;
  border: none;
  outline: none;
  cursor: text;
`;

export default Tag;
