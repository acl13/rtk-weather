import { Sparklines, SparklinesCurve, SparklinesReferenceLine } from "react-sparklines";

const WeatherDataChart = ({ data, color, text }) => {
 return (
  <div className="col-sm">
  <Sparklines data={data}>
    <SparklinesCurve color={color} />
    <SparklinesReferenceLine type="avg"></SparklinesReferenceLine>
  </Sparklines>
  <p className="text-center">{text}</p>
</div>
 )
}

export default WeatherDataChart;