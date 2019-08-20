import * as React from "react";

const JSONLDSerializer: jest.SnapshotSerializerPlugin = {
  test(val) {
    return Boolean(
      val &&
        val.$$typeof === Symbol.for("react.element") &&
        val.type === "script" &&
        val.props.dangerouslySetInnerHTML &&
        val.props.type &&
        val.props.type === "application/ld+json"
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

module.exports = JSONLDSerializer;
export default JSONLDSerializer;
