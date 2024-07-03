/* Copyright(C) 2017-2024, HJD (https://github.com/hjdhjd). All rights reserved.
 *
 * webUi.mjs: Plugin webUI.
 */
"use strict";

import { webUiFeatureOptions } from "./webUi-featureoptions.mjs";

export class webUi {

  // Feature options class instance.
  featureOptions;

  // First run webUI callback endpoints for customization.
  #firstRun;

  // Plugin name.
  #name;

  /**
   * featureOptions - parameters to webUiFeatureOptions.
   * firstRun - first run handlers:
   *   isRequired - do we need to run the first run UI workflow?
   *   onStart - initialization for the first run webUI to populate forms and other startup tasks.
   *   onSubmit - execute the first run workflow, typically a login or configuration validation of some sort.
   * name - plugin name.
   */
  constructor({ featureOptions, firstRun = {}, name } = {}) {

    // Defaults for our first run handlers.
    this.firstRun = { isRequired: () => false, onStart: () => true, onSubmit: () => true };

    // Figure out the options passed in to us.
    this.featureOptions = new webUiFeatureOptions(featureOptions);
    this.firstRun = Object.assign({}, this.firstRun, firstRun);
    this.name = name;
  }

  /**
   * Render the webUI.
   */
  // Render the UI.
  show() {

    // Fire off our UI, catching errors along the way.
    try {

      this.#launchWebUI();
    } catch(err) {

      // If we had an error instantiating or updating the UI, notify the user.
      homebridge.toast.error(err.message, "Error");
    } finally {

      // Always leave the UI in a usable place for the end user.
      homebridge.hideSpinner();
    }
  }

  // Show the first run user experience if we don't have valid login credentials.
  async #showFirstRun() {

    const buttonFirstRun = document.getElementById("firstRun");

    // Run a custom initialization handler the user may have provided.
    if(!(await this.#processHandler(this.firstRun.onStart))) {

      return;
    }

    // First run user experience.
    buttonFirstRun.addEventListener("click", async () => {

      // Show the beachball while we setup.
      homebridge.showSpinner();

      // Run a custom submit handler the user may have provided.
      if(!(await this.#processHandler(this.firstRun.onSubmit))) {

        return;
      }

      // Create our UI.
      document.getElementById("pageFirstRun").style.display = "none";
      document.getElementById("menuWrapper").style.display = "inline-flex";
      this.featureOptions.show();

      // All done. Let the user interact with us, although in practice, we shouldn't get here.
      // homebridge.hideSpinner();
    });

    document.getElementById("pageFirstRun").style.display = "block";
  }

  // Show the main plugin configuration tab.
  #showSettings() {

    // Show the beachball while we setup.
    homebridge.showSpinner();

    // Highlight the tab in our UI.
    this.#toggleClasses("menuHome", "btn-elegant", "btn-primary");
    this.#toggleClasses("menuFeatureOptions", "btn-elegant", "btn-primary");
    this.#toggleClasses("menuSettings", "btn-primary", "btn-elegant");

    document.getElementById("pageSupport").style.display = "none";
    document.getElementById("pageFeatureOptions").style.display = "none";

    homebridge.showSchemaForm();

    // All done. Let the user interact with us.
    homebridge.hideSpinner();
  }

  // Show the support tab.
  #showSupport() {

    // Show the beachball while we setup.
    homebridge.showSpinner();
    homebridge.hideSchemaForm();

    // Highlight the tab in our UI.
    this.#toggleClasses("menuHome", "btn-primary", "btn-elegant");
    this.#toggleClasses("menuFeatureOptions", "btn-elegant", "btn-primary");
    this.#toggleClasses("menuSettings", "btn-elegant", "btn-primary");

    document.getElementById("pageSupport").style.display = "block";
    document.getElementById("pageFeatureOptions").style.display = "none";

    // All done. Let the user interact with us.
    homebridge.hideSpinner();
  }

  // Launch our webUI.
  async #launchWebUI() {

    // Retrieve the current plugin configuration.
    this.featureOptions.currentConfig = await homebridge.getPluginConfig();

    // Add our event listeners to animate the UI.
    document.getElementById("menuHome").addEventListener("click", () => this.#showSupport());
    document.getElementById("menuFeatureOptions").addEventListener("click", () => this.featureOptions.show());
    document.getElementById("menuSettings").addEventListener("click", () => this.#showSettings());

    // Get the list of devices the plugin knows about.
    const devices = await homebridge.getCachedAccessories();

    // If we've got devices detected, we launch our feature option UI. Otherwise, we launch our first run UI.
    if(this.featureOptions.currentConfig.length && devices?.length && !(await this.#processHandler(this.firstRun.isRequired))) {

      document.getElementById("menuWrapper").style.display = "inline-flex";
      this.featureOptions.show();

      return;
    }

    // If we have the name property set for the plugin configuration yet, let's do so now. If we don't have a configuration, let's initialize it as well.
    (this.featureOptions.currentConfig[0] ??= { name: this.name }).name ??= this.name;

    // Update the plugin configuration and launch the first run UI.
    await homebridge.updatePluginConfig(this.featureOptions.currentConfig);
    this.#showFirstRun();
  }

  // Utility to process user-provided custom handlers that can handle both synchronous and asynchronous handlers.
  async #processHandler(handler) {

    if(((typeof handler === "function") && !(await handler())) || ((typeof handler !== "function") && !handler)) {

      return false;
    }

    return true;
  }

  // Utility to toggle our classes.
  #toggleClasses(id, removeClass, addClass) {

    const element = document.getElementById(id);

    element.classList.remove(removeClass);
    element.classList.add(addClass);
  }
}
