/* eslint-disable @typescript-eslint/no-explicit-any */

import * as React from "react";

function isReactElement(val: any): boolean {
  return Boolean(val.$$typeof && val.$$typeof === Symbol.for("react.element"));
}

function isScriptElement(val: any): boolean {
  return Boolean(val.type && val.type === "script");
}

function hasValidProps(val: any): boolean {
  return Boolean(
    val.props &&
      val.props.dangerouslySetInnerHTML &&
      val.props.type &&
      val.props.type === "application/ld+json"
  );
}

const JSONLDSerializer: jest.SnapshotSerializerPlugin = {
  test(val) {
    return Boolean(
      val && isReactElement(val) && isScriptElement(val) && hasValidProps(val)
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
