export const MultiPolygon = (props) => {
  console.log(props);
  return (
    <>
      {props.points.map((polygon, index) => {
        const id = `${props.id}.${index}`;
        return <polygon {...props} key={id} id={id} points={polygon} />;
      })}
    </>
  );
};
