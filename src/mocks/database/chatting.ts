export const roomDataList = [
  {
    roomId: '1-2',
    userId: 1,
    userName: '손영배',
    profileImg: '/images/assets/basic-profile-img.png',
    content: '안녕하세요',
    sentTime: '2022-01-17T17:03:45.336763',
    userEmail: 'thsdudqo@naver.com',
  },
  {
    roomId: '2-3',
    userId: 3,
    userName: '박정환',
    profileImg: '/images/assets/basic-profile-img.png',
    content: '안녕하세요',
    sentTime: '2022-01-17T17:03:36.336763',
    userEmail: 'qkrwjdghks@naver.com',
  },
];

export const chatLogList = {
  contentList: [
    {
      id: 1,
      roomId: '1-2',
      content:
        '안녕하세요! ㅁㅁ님의 주요기술이 저희팀에 필요해서 연락드렸습니다. 혹시 팀 구하셨나요?',
      userName: '손영배',
      sentTime: '2022-01-17T17:03:48.336763',
      senderId: 1,
    },
    {
      id: 2,
      roomId: '1-2',
      content: '아직 안구했습니다!',
      userName: '조원빈',
      sentTime: '2022-01-17T17:03:47.336763',
      senderId: 2,
    },
    {
      id: 3,
      roomId: '1-2',
      content: '저희 팀에 함께 해주실 수 있을까요?',
      userName: '손영배',
      sentTime: '2022-01-17T17:03:46.336763',
      senderId: 1,
    },
    {
      id: 4,
      roomId: '1-2',
      content: '네 좋습니다ㅎㅎ',
      userName: '조원빈',
      sentTime: '2022-01-17T17:03:45.336763',
      senderId: 2,
    },
  ],
  nextCursor: 4,
};
