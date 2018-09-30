import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  Grid,
  BarSeries,
  Title,
} from '@devexpress/dx-react-chart-material-ui';

const imageSize = 50;
const labelOffset = 10;


const getPath = (x, y, width, height) => `M ${x} ${height + y}
   L ${width + x} ${height + y}
   L ${width + x} ${y + 30}
   L ${(width / 2) + x} ${y}
   L ${x} ${y + 30}
   Z`;

const BarWithLabel = (props) => {
  const {
    x, y, width, height, color, value,
  } = props;

  return (
    <React.Fragment>
      <path d={getPath(x, y, width, height)} fill={color} />
      <ArgumentAxis.Label
        x={x + (width / 2)}
        y={y + (height / 2)}
        dominantBaseline="central"
        textAnchor="middle"
        text={value}
        style={{ fill: '#BBDEFB' }}
      />
    </React.Fragment>);
};

export default class Demo extends React.PureComponent {
  constructor(props) {
    super(props);
    this.getLabelWithAvatarComponent = this.getLabelWithAvatarComponent.bind(this);
  }


  getLabelWithAvatarComponent(props) {
    const { text, x, y } = props;
    const { githubUsersData } = this.props;
    const contributor = githubUsersData.find(({ login }) => login === text);
    return (
      <React.Fragment>
        <image
          href={contributor.avatar_url}
          width={imageSize}
          height={imageSize}
          transform={`translate(${x - (imageSize / 2)} ${y - labelOffset})`}
        />
        <ArgumentAxis.Label {...props} y={y + imageSize} />
      </React.Fragment>);
  }

  render() {
    const {
      githubUsersData: chartData,
    } = this.props;

    if(chartData) {
      chartData.sort((a, b) => {
        const commitsByA = a.contributions
        const commitsByB = b.contributions
        return commitsByB - commitsByA
        })
    }

    return (
      <Paper>
        {
          chartData ? (
            <Chart data={chartData.slice(0, 7)}>
              <ArgumentAxis
                name="login"
                type="band"
                labelComponent={this.getLabelWithAvatarComponent}
                tickComponent={() => null}
              />
              <ValueAxis name="commits" lineComponent={() => null} />
              <Grid name="commits" strokeDasharray="10 5" />

              <BarSeries
                name="Contributions"
                valueField="contributions"
                argumentField="login"
                axisName="commits"
                pointComponent={BarWithLabel}
              />
              <Title
                text={`Contributions commits`}
                style={{ textAlign: 'center', width: '100%', marginBottom: 4 }}
              />
            </Chart>
          ) : null
        }
      </Paper>
    );
  }
}
