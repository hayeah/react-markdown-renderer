import * as React from "react";

const headerLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];

interface Props {
	depth: number,
	text: string,
	id: string,
}

let Heading = (props: Props) => {
  let {depth, text, id} = props;
  let tag = headerLevels[depth - 1];
  let headerProps = id ? { id } : {};

  let body = (
    <a href={"#" + id}>
      {text}
		</a>
  );
  return React.createElement(tag, headerProps, body);
}

export default Heading;