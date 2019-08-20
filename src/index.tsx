/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";

function hasValidProps(val: any): boolean {
  return Boolean(
    val.props.dangerouslySetInnerHTML &&
      val.props.type &&
      val.props.type === "application/ld+json"
  );
}

const JSONLDSerializer: jest.SnapshotSerializerPlugin = {
  test(val) {
    return Boolean(
      val &&
        React.isValidElement(val) &&
        val.type === "script" &&
        hasValidProps(val)
    );
  },

  print(val, serialize) {
    const { dangerouslySetInnerHTML, ...tag } = val.props;

    return serialize(
      <script {...tag}>
        {serialize(JSON.parse(dangerouslySetInnerHTML.__html))}
      </script>
    );
  }
};

export = JSONLDSerializer;
