import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Preview from "@/components/Preview";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("Preview.vue", () => {
  let actions;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      state: {
        preview: "<p>Test</p>",
        source: "<p>Test</p>"
      }
    });
  });

  it("render Preview", () => {
    const wrapper = shallowMount(Preview, {
      store,
      localVue
    });
    expect(wrapper.find(".preview-body").text()).toBe("Test");
  });
});
