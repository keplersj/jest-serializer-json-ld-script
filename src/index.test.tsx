import * as React from "react";
import serializer from ".";

describe("Serializer test function", () => {
  // This is how React Helmet sets data of the element. An end user likely wouldn't do this on their own.
  it("returns true when given a JSON+LD script element with data set dangerously", () => {
    const element = (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({}) }}
      />
    );
    const shouldSerialize = serializer.test(element);

    expect(shouldSerialize).toEqual(true);
  });

  it("returns false when given a script element that's not JSON+LD", () => {
    const element = (
      <script
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({}) }}
      />
    );
    const shouldSerialize = serializer.test(element);

    expect(shouldSerialize).toEqual(false);
  });

  it("returns false when given a non-script element", () => {
    const element = <div />;
    const shouldSerialize = serializer.test(element);

    expect(shouldSerialize).toEqual(false);
  });
});

describe("Serialization function", () => {
  it("serializes a JSON+LD script element with data set dangerously correctly", () => {
    expect.addSnapshotSerializer(serializer);

    const ldScriptElement = (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({}) }}
      />
    );

    expect(ldScriptElement).toMatchSnapshot();
  });
});
