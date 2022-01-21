import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { DoughnutChartData } from '../../types/chartType';

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  frontendHeadcount: number;
  backendHeadcount: number;
}

const JobDoughnutChart: React.FC<Props> = ({
  frontendHeadcount,
  backendHeadcount,
}) => {
  const [data, setData] = useState<DoughnutChartData>({
    labels: ['Front-end', 'Back-end'],
    datasets: [
      {
        label: '# of Votes',
        data: [1, 3],
        backgroundColor: ['rgba(97, 218, 251, 0.2)', 'rgba(104, 169, 62, 0.2)'],
        borderColor: ['rgba(97, 218, 251, 1)', 'rgba(104, 169, 62, 1)'],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    setData({
      labels: ['Front-end', 'Back-end'],
      datasets: [
        {
          label: '# of Votes',
          data: [frontendHeadcount, backendHeadcount],
          backgroundColor: [
            'rgba(97, 218, 251, 0.2)',
            'rgba(104, 169, 62, 0.2)',
          ],
          borderColor: ['rgba(97, 218, 251, 1)', 'rgba(104, 169, 62, 1)'],
          borderWidth: 1,
        },
      ],
    });
  }, [frontendHeadcount, backendHeadcount]);

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

export default JobDoughnutChart;
