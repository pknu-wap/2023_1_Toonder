import React, { useState } from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-height: 300px;
  overflow-y: scroll;
  border: 1px solid #ccc;
  padding: 10px;
  width: 200px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  width: 50%;
  margin-bottom: 5px;
`;

const CheckboxInput = styled.input`
  margin-right: 5px;
`;

const hashtagOptions = [
  '공포',
  '드라마',
  '코믹',
  '일상',
  '판타지',
  '액션',
  '역사',
  '학원',
  'SF',
  '학습만화',
  '캠페인',
  '스포츠',
  '동성애',
  '추리',
  '모험',
  '무협',
  '시사',
  '교양',
  '요리',
  '성인',
  '순정',
  'BL',
  '소년',
  '미스터리',
  'GL',
  '로맨스판타지',
  '카툰',
  '기관발행물',
  '만화이론',
  '로맨스',
  '그래픽노블',
  '개그',
];

function Practice() {
  const [selectedHashtags, setSelectedHashtags] = useState([]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedHashtags((prevSelectedHashtags) => [
        ...prevSelectedHashtags,
        value,
      ]);
    } else {
      setSelectedHashtags((prevSelectedHashtags) =>
        prevSelectedHashtags.filter((hashtag) => hashtag !== value)
      );
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const hashtag = selectedHashtags.join(' ');
    //console.log(hashtag);
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <CheckboxContainer>
          {hashtagOptions.map((hashtag) => (
            <CheckboxLabel key={hashtag}>
              <CheckboxInput
                type="checkbox"
                value={hashtag}
                onChange={handleCheckboxChange}
              />
              {hashtag}
            </CheckboxLabel>
          ))}
        </CheckboxContainer>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Practice;
