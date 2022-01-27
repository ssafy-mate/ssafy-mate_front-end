import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { DoughnutChartData } from '../../types/chartTypes';

interface RecruitingStatusChartProps {
  totalRecruitment: number;
  totalHeadcount: number;
}

ChartJS.register(ArcElement, Tooltip, Legend);

const RecruitingStatusChart: React.FC<RecruitingStatusChartProps> = ({
  totalRecruitment,
  totalHeadcount,
}) => {
  const [data, setData] = useState<DoughnutChartData>({
    labels: ['모집된 인원', '부족한 인원'],
    datasets: [
      {
        label: '# of Votes',
        data: [totalHeadcount, totalRecruitment - totalHeadcount],
        backgroundColor: [
          'rgba(51, 150, 244, 0.2)',
          'rgba(209, 212, 218, 0.2)',
        ],
        borderColor: ['rgba(51, 150, 244, 1)', 'rgba(209, 212, 218, 1)'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setData({
      labels: ['모집된 인원', '부족한 인원'],
      datasets: [
        {
          label: '# of Votes',
          data: [totalHeadcount, totalRecruitment - totalHeadcount],
          backgroundColor: [
            'rgba(51, 150, 244, 0.2)',
            'rgba(209, 212, 218, 0.2)',
          ],
          borderColor: ['rgba(51, 150, 244, 1)', 'rgba(209, 212, 218, 1)'],
          borderWidth: 1,
        },
      ],
    });
  }, [totalHeadcount, totalRecruitment]);

  return (
    <Container>
      <Doughnut data={data} />
    </Container>
  );
};

const Container = styled.div`
  padding: 14px;
  border: 1px solid #d7e2eb;
  border-radius: 4px;
  box-sizing: border-box;
`;

export default RecruitingStatusChart;
