import * as React from "react";

const JSONLDSerializer: jest.SnapshotSerializerPlugin = {
  test(val) {
    return Boolean(
      val &&
        // React.isValidElement(val) && // Previously we were using this API to shortcut testing if an object was a React object, but this produces false negatives on <script/> elements wrapped in Components. While it might take longer to fail on some tests, it should produce a negligable effect.
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

export = JSONLDSerializer;
