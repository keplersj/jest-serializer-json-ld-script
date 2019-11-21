import * as React from "react";
import renderer from "react-test-renderer";
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

  it("return false when given a React component", () => {
    const Component = (): React.ReactElement => (
      <div>
        <span>Test Component</span>
      </div>
    );
    const shouldSerialize = serializer.test(<Component />);

    expect(shouldSerialize).toEqual(false);
  });

  it("returns false if value is undefined", () => {
    const shouldSerialize = serializer.test(undefined);

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

  it("serializes a script element with data correctly", () => {
    expect.addSnapshotSerializer(serializer);

    const element = (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "http://schema.org",
            "@type": "Thing",
            "@id": "https://example.dev/example_thing"
          })
        }}
      />
    );

    expect(element).toMatchSnapshot();
  });

  it("serializes a wrapped script element with data correctly", () => {
    expect.addSnapshotSerializer(serializer);

    const element = (
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "http://schema.org",
              "@type": "Thing",
              "@id": "https://example.dev/example_thing"
            })
          }}
        />
      </div>
    );

    expect(element).toMatchSnapshot();
  });

  it("serializes a script element created using React.createElement", () => {
    expect.addSnapshotSerializer(serializer);

    const element = React.createElement("script", {
      type: "application/ld+json",
      dangerouslySetInnerHTML: {
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "Thing",
          "@id": "https://example.dev/example_thing"
        })
      }
    });

    expect(element).toMatchSnapshot();
  });

  it("serializes a script element wrapped in a component", () => {
    expect.addSnapshotSerializer(serializer);

    const Component = () => (
      <div>
        <div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "http://schema.org",
                "@type": "Thing",
                "@id": "https://example.dev/example_thing"
              })
            }}
          />
        </div>
      </div>
    );

    const tree = renderer.create(<Component />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Serialization module", () => {
  it("matches expectations", () => {
    expect(serializer).toMatchSnapshot();
  });
});
