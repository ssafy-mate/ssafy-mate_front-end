interface SsafyTrack {
  id: number;
  name: string;
}

interface Campus {
  id: number;
  area: string;
  ssafyTracks: SsafyTrack[];
}

export const SSAFY_TRACK_LIST: SsafyTrack[] = [
  {
    id: 1,
    name: 'Python Track',
  },
  {
    id: 2,
    name: 'Java Track',
  },
  {
    id: 3,
    name: 'Embeded Track',
  },
  {
    id: 4,
    name: 'Mobile Track',
  },
];

export const CAMPUS_LIST: Campus[] = [
  {
    id: 1,
    area: '서울',
    ssafyTracks: [
      {
        id: 1,
        name: 'Python Track',
      },
      {
        id: 2,
        name: 'Java Track',
      },
      {
        id: 3,
        name: 'Embeded Track',
      },
    ],
  },
  {
    id: 2,
    area: '대전',
    ssafyTracks: [
      {
        id: 1,
        name: 'Python Track',
      },
      {
        id: 2,
        name: 'Java Track',
      },
    ],
  },
  {
    id: 3,
    area: '광주',
    ssafyTracks: [
      {
        id: 1,
        name: 'Python Track',
      },
      {
        id: 2,
        name: 'Java Track',
      },
    ],
  },
  {
    id: 4,
    area: '구미',
    ssafyTracks: [
      {
        id: 1,
        name: 'Python Track',
      },
      {
        id: 2,
        name: 'Java Track',
      },
      {
        id: 3,
        name: 'Mobile Track',
      },
    ],
  },
  {
    id: 5,
    area: '부울경',
    ssafyTracks: [
      {
        id: 1,
        name: 'Python Track',
      },
      {
        id: 2,
        name: 'Java Track',
      },
    ],
  },
];

export interface ProjectTrack {
  id: number;
  name: string;
}

interface Project {
  id: number;
  name: string;
  projectTracks?: ProjectTrack[];
}

export const PROJECT_LIST: Project[] = [
  {
    id: 1,
    name: '공통 프로젝트',
    projectTracks: [
      {
        id: 1,
        name: '웹 기술',
      },
      {
        id: 2,
        name: '웹 디자인',
      },
      {
        id: 3,
        name: '웹 IoT',
      },
    ],
  },
  {
    id: 2,
    name: '특화 프로젝트',
    projectTracks: [
      {
        id: 1,
        name: '인공지능(영상)',
      },
      {
        id: 2,
        name: '인공지능(음성)',
      },
      {
        id: 3,
        name: '빅데이터(추천)',
      },
      {
        id: 4,
        name: '빅데이터(분산)',
      },
      {
        id: 5,
        name: '블록체인(P2P거래)',
      },
      {
        id: 6,
        name: '블록체인(디지털화폐)',
      },
      {
        id: 7,
        name: 'IoT 제어',
      },
    ],
  },
  {
    id: 3,
    name: '자율 프로젝트',
  },
];
