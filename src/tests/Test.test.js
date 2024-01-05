import { shallow } from "enzyme";
import { Test } from "./tests/Test";

describe("<Test /> renders correctly", () => {
  it("Renders correctly", () => {
    const wrapper = shallow(<Test />);
    expect(wrapper).toMatchSnapshot();
  });
});
