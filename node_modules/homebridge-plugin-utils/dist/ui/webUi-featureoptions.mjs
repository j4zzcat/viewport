/* Copyright(C) 2017-2024, HJD (https://github.com/hjdhjd). All rights reserved.
 *
 * webUi-featureoptions.mjs: Device feature option webUI.
 */
"use strict";

import { FeatureOptions} from "./featureoptions.js";

export class webUiFeatureOptions {

  // Table containing the currently displayed feature options.
  #configTable;

  // The current controller context.
  #controller;

  // The current plugin configuration.
  currentConfig;

  // Table containing the details on the currently selected device.
  deviceStatsTable;

  // Current list of devices from the Homebridge accessory cache.
  #devices;

  // Table containing the list of devices.
  devicesTable;

  // Feature options instance.
  #featureOptions;

  // Get devices handler.
  #getDevices;

  // Enable the use of controllers.
  #hasControllers;

  // Device information panel handler.
  #infoPanel;

  // Sidebar configuration parameters.
  #sidebar;

  // Options UI configuration parameters.
  #ui;

  // Current list of controllers, for webUI elements.
  webUiControllerList;

  // Current list of devices on a given controller, for webUI elements.
  webUiDeviceList;

  /**
   * Display the feature option webUI. All webUI configuration settings are optional.
   *
   * getDevices - return an array of displays to be displayed.
   * hasControllers - true (default) if the plugin hierarchically has controllers and then devices managed by each controller, rather than just devices.
   * infoPanel - handler to display information in the device detail information panel.
   * ui - customize which options are displayed in the feature option webUI:
   *   isController - validate whether a given device is a controller. Returns true or false.
   *   validOption - validate whether an option is valid on a given device (or controller).
   *   validCategory - validate whether a category of options is valid for a given device (or controller).
   * sidebar - customize the sidebar for the feature option webUI:
   *   controllerLabel - label to use for the controllers category. Defaults to "Controllers".
   *   deviceLabel - label to use for the devices category. Defaults to "Devices".
   *   showDevices - handler for enumerating devices in the sidebar.
   */
  constructor(options = {}) {

    // Defaults for the feature option webUI sidebar.
    this.ui = {

      isController: () => false,
      validOption: () => true,
      validOptionCategory: () => true
    };

    // Defaults for the feature option webUI sidebar.
    this.sidebar = {

      controllerLabel: "Controllers",
      deviceLabel: "Devices",
      showDevices: this.#showSidebarDevices.bind(this)
    };

    // Defaults for the feature option webUI.
    const {

      getDevices = this.#getHomebridgeDevices,
      hasControllers = true,
      infoPanel = this.#showDeviceInfoPanel,
      sidebar = {},
      ui = {}
    } = options;

    this.configTable = document.getElementById("configTable");
    this.controller = null;
    this.currentConfig = [];
    this.deviceStatsTable = document.getElementById("deviceStatsTable");
    this.devices = [];
    this.devicesTable = document.getElementById("devicesTable");
    this.featureOptions = null;
    this.getDevices = getDevices;
    this.hasControllers = hasControllers;
    this.infoPanel = infoPanel;
    this.sidebar = Object.assign({}, this.sidebar, sidebar);
    this.ui = Object.assign({}, this.ui, ui);
    this.webUiControllerList = [];
    this.webUiDeviceList = [];
  }

  /**
   * Render the feature options webUI.
   */
  async show() {

    // Show the beachball while we setup.
    homebridge.showSpinner();
    homebridge.hideSchemaForm();

    // Create our custom UI.
    document.getElementById("menuHome").classList.remove("btn-elegant");
    document.getElementById("menuHome").classList.add("btn-primary");
    document.getElementById("menuFeatureOptions").classList.add("btn-elegant");
    document.getElementById("menuFeatureOptions").classList.remove("btn-primary");
    document.getElementById("menuSettings").classList.remove("btn-elegant");
    document.getElementById("menuSettings").classList.add("btn-primary");

    // Hide the legacy UI.
    document.getElementById("pageSupport").style.display = "none";
    document.getElementById("pageFeatureOptions").style.display = "block";

    // Make sure we have the refreshed configuration.
    this.currentConfig = await homebridge.getPluginConfig();

    // Retrieve the set of feature options available to us.
    const features = (await homebridge.request("/getOptions")) ?? [];

    // Initialize our feature option configuration.
    this.featureOptions = new FeatureOptions(features.categories, features.options, this.currentConfig[0].options ?? []);

    // We render our global options, followed by either a list of controllers (if so configured) or by a list of devices from the Homebridge accessory cache.

    // Retrieve the table for the our list of controllers and global options.
    const controllersTable = document.getElementById("controllersTable");

    // Start with a clean slate.
    controllersTable.innerHTML = "";
    this.devicesTable.innerHTML = "";
    this.configTable.innerHTML = "";
    this.webUiDeviceList = [];

    // Create our hover style for our sidebar.
    const sidebarHoverStyle = document.createElement("style");

    // We emulate the styles that Bootstrap uses when hovering over a table, accounting for both light and dark modes.
    sidebarHoverStyle.innerHTML = "@media (prefers-color-scheme: dark) { .hbup-hover td:hover { background-color: #212121; color: #FFA000 } }" +
      "@media (prefers-color-scheme: light) { .hbup-hover td:hover { background-color: #ECECEC; } }";

    document.head.appendChild(sidebarHoverStyle);

    // Add our hover styles to the controllers and devices tables.
    controllersTable.classList.add("hbup-hover");
    this.devicesTable.classList.add("hbup-hover");

    // Hide the UI until we're ready.
    document.getElementById("sidebar").style.display = "none";
    document.getElementById("headerInfo").style.display = "none";
    document.getElementById("deviceStatsTable").style.display = "none";

    // If we haven't configured any controllers, we're done.
    if(this.hasControllers && !this.currentConfig[0]?.controllers?.length) {

      document.getElementById("headerInfo").innerHTML = "Please configure a controller to access in the main settings tab before configuring feature options.";
      document.getElementById("headerInfo").style.display = "";
      homebridge.hideSpinner();

      return;
    }

    // Initialize our informational header.
    document.getElementById("headerInfo").innerHTML = "Feature options are applied in prioritized order, from global to device-specific options:" +
      "<br><i class=\"text-warning\">Global options</i> (lowest priority) &rarr; " +
      (this.hasControllers ? "<i class=\"text-success\">Controller options</i> &rarr; " : "") +
      "<i class=\"text-info\">Device options</i> (highest priority)";

    // Enumerate our global options.
    const trGlobal = document.createElement("tr");

    // Create the cell for our global options.
    const tdGlobal = document.createElement("td");

    tdGlobal.classList.add("m-0", "p-0", "w-100");

    // Create our label target.
    const globalLabel = document.createElement("label");

    globalLabel.name = "Global Options";
    globalLabel.appendChild(document.createTextNode("Global Options"));
    globalLabel.style.cursor = "pointer";
    globalLabel.classList.add("m-0", "p-0", "pl-1", "w-100");

    globalLabel.addEventListener("click", () => this.#showSidebar(null));

    // Add the global options label.
    tdGlobal.appendChild(globalLabel);
    tdGlobal.style.fontWeight = "bold";

    // Add the global cell to the table.
    trGlobal.appendChild(tdGlobal);

    // Now add it to the overall controllers table.
    controllersTable.appendChild(trGlobal);

    // Add it as another controller of device, for UI purposes.
    (this.hasControllers ? this.webUiControllerList : this.webUiDeviceList).push(globalLabel);

    if(this.hasControllers) {

      // Create a row for our controllers.
      const trController = document.createElement("tr");

      // Disable any pointer events and hover activity.
      trController.style.pointerEvents = "none";

      // Create the cell for our controller category row.
      const tdController = document.createElement("td");

      tdController.classList.add("m-0", "p-0", "pl-1", "w-100");

      // Add the category name, with appropriate casing.
      tdController.appendChild(document.createTextNode(this.sidebar.controllerLabel));
      tdController.style.fontWeight = "bold";

      // Add the cell to the table row.
      trController.appendChild(tdController);

      // Add the table row to the table.
      controllersTable.appendChild(trController);

      for(const controller of this.currentConfig[0].controllers) {

        // Create a row for this controller.
        const trDevice = document.createElement("tr");

        trDevice.classList.add("m-0", "p-0");

        // Create a cell for our controller.
        const tdDevice = document.createElement("td");

        tdDevice.classList.add("m-0", "p-0", "w-100");

        const label = document.createElement("label");

        label.name = controller.address;
        label.appendChild(document.createTextNode(controller.address));
        label.style.cursor = "pointer";
        label.classList.add("mx-2", "my-0", "p-0", "w-100");

        label.addEventListener("click", () => this.#showSidebar(controller));

        // Add the controller label to our cell.
        tdDevice.appendChild(label);

        // Add the cell to the table row.
        trDevice.appendChild(tdDevice);

        // Add the table row to the table.
        controllersTable.appendChild(trDevice);

        this.webUiControllerList.push(label);
      }
    }

    // All done. Let the user interact with us.
    homebridge.hideSpinner();

    // Default the user on our global settings if we have no controller.
    this.#showSidebar(this.hasControllers ? this.currentConfig[0].controllers[0] : null);
  }

  // Show the device list taking the controller context into account.
  async #showSidebar(controller) {

    // Show the beachball while we setup.
    homebridge.showSpinner();

    // Grab the list of devices we're displaying.
    this.devices = await this.getDevices(controller);

    if(this.hasControllers) {

      // Make sure we highlight the selected controller so the user knows where we are.
      this.webUiControllerList.map(webUiEntry => (webUiEntry.name === (controller ? controller.address : "Global Options")) ?
        webUiEntry.parentElement.classList.add("bg-info", "text-white") : webUiEntry.parentElement.classList.remove("bg-info", "text-white"));

      // Unable to connect to the controller for some reason.
      if(controller && !this.devices?.length) {

        this.devicesTable.innerHTML = "";
        this.configTable.innerHTML = "";

        document.getElementById("headerInfo").innerHTML = ["Unable to connect to the controller.",
          "Check the Settings tab to verify the controller details are correct.",
          "<code class=\"text-danger\">" + (await homebridge.request("/getErrorMessage")) + "</code>"].join("<br>");
        document.getElementById("headerInfo").style.display = "";
        this.deviceStatsTable.style.display = "none";

        homebridge.hideSpinner();

        return;
      }

      // The first entry returned by getDevices() must always be the controller.
      this.controller = this.devices[0]?.serial ?? null;
    }

    // Make the UI visible.
    document.getElementById("headerInfo").style.display = "";
    document.getElementById("sidebar").style.display = "";

    // Wipe out the device list, except for our global entry.
    this.webUiDeviceList.splice(1, this.webUiDeviceList.length);

    // Start with a clean slate.
    this.devicesTable.innerHTML = "";

    // Populate our devices sidebar.
    this.sidebar.showDevices(controller, this.devices);

    // Display the feature options to the user.
    this.showDeviceOptions(controller ? this.devices[0].serial : "Global Options");

    // All done. Let the user interact with us.
    homebridge.hideSpinner();
  }

  // Show feature option information for a specific device, controller, or globally.
  showDeviceOptions(deviceId) {

    homebridge.showSpinner();

    // Update the selected device for visibility.
    this.webUiDeviceList.map(webUiEntry => (webUiEntry.name === deviceId) ?
      webUiEntry.parentElement.classList.add("bg-info", "text-white") : webUiEntry.parentElement.classList.remove("bg-info", "text-white"));

    // Populate the device information info pane.
    const currentDevice = this.devices.find(device => device.serial === deviceId);

    // Populate the details view. If there's no device specified, the context is considered global and we hide the device details view.
    if(!currentDevice) {

      this.deviceStatsTable.style.display = "none";
    }

    this.infoPanel(currentDevice);

    if(currentDevice) {

      this.deviceStatsTable.style.display = "";
    }

    // Start with a clean slate.
    this.configTable.innerHTML = "";

    for(const category of this.featureOptions.categories) {

      // Validate that we should display this feature option category. This is useful when you want to only display feature option categories for certain device types.
      if(!this.ui.validOptionCategory(currentDevice, category)) {

        continue;
      }

      const optionTable = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
      const trFirst = document.createElement("tr");
      const th = document.createElement("th");

      // Set our table options.
      optionTable.classList.add("table", "table-borderless", "table-sm", "table-hover");
      th.classList.add("p-0");
      th.style.fontWeight = "bold";
      th.colSpan = 3;
      tbody.classList.add("table-bordered");

      // Add the feature option category description.
      th.appendChild(document.createTextNode(category.description + (!currentDevice ? " (Global)" :
        (this.ui.isController(currentDevice) ? " (Controller-specific)" : " (Device-specific)"))));

      // Add the table header to the row.
      trFirst.appendChild(th);

      // Add the table row to the table head.
      thead.appendChild(trFirst);

      // Finally, add the table head to the table.
      optionTable.appendChild(thead);

      // Keep track of the number of options we have made available in a given category.
      let optionsVisibleCount = 0;

      // Now enumerate all the feature options for a given device.
      for(const option of this.featureOptions.options[category.name]) {

        // Only show feature options that are valid for this device.
        if(!this.ui.validOption(currentDevice, option)) {

          continue;
        }

        // Expand the full feature option.
        const featureOption = this.featureOptions.expandOption(category, option);

        // Create the next table row.
        const trX = document.createElement("tr");

        trX.classList.add("align-top");
        trX.id = "row-" + featureOption;

        // Create a checkbox for the option.
        const tdCheckbox = document.createElement("td");

        // Create the actual checkbox for the option.
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.readOnly = false;
        checkbox.id = featureOption;
        checkbox.name = featureOption;
        checkbox.value = featureOption + (!currentDevice ? "" : ("." + currentDevice.serial));

        let initialValue = undefined;
        let initialScope;

        // Determine our initial option scope to show the user what's been set.
        switch(initialScope = this.featureOptions.scope(featureOption, currentDevice?.serial, this.controller)) {

          case "global":
          case "controller":

            // If we're looking at the global scope, show the option value. Otherwise, we show that we're inheriting a value from the scope above.
            if(!currentDevice) {

              if(this.featureOptions.isValue(featureOption)) {

                checkbox.checked = this.featureOptions.exists(featureOption);
                initialValue = this.featureOptions.value(checkbox.id);
              } else {

                checkbox.checked = this.featureOptions.test(featureOption);
              }

              if(checkbox.checked) {

                checkbox.indeterminate = false;
              }

            } else {

              if(this.featureOptions.isValue(featureOption)) {

                initialValue = this.featureOptions.value(checkbox.id, (initialScope === "controller") ? this.controller : undefined);
              }

              checkbox.readOnly = checkbox.indeterminate = true;
            }

            break;

          case "device":
          case "none":
          default:

            if(this.featureOptions.isValue(featureOption)) {

              checkbox.checked = this.featureOptions.exists(featureOption, currentDevice?.serial);
              initialValue = this.featureOptions.value(checkbox.id, currentDevice?.serial);
            } else {

              checkbox.checked = this.featureOptions.test(featureOption, currentDevice?.serial);
            }

            break;
        }

        checkbox.defaultChecked = option.default;
        checkbox.classList.add("mx-2");

        // Add the checkbox to the table cell.
        tdCheckbox.appendChild(checkbox);

        // Add the checkbox to the table row.
        trX.appendChild(tdCheckbox);

        const tdLabel = document.createElement("td");

        tdLabel.classList.add("w-100");
        tdLabel.colSpan = 2;

        let inputValue = null;

        // Add an input field if we have a value-centric feature option.
        if(this.featureOptions.isValue(featureOption)) {

          const tdInput = document.createElement("td");

          tdInput.classList.add("mr-2");
          tdInput.style.width = "10%";

          inputValue = document.createElement("input");
          inputValue.type = "text";
          inputValue.value = initialValue ?? option.defaultValue;
          inputValue.size = 5;
          inputValue.readOnly = !checkbox.checked;

          // Add or remove the setting from our configuration when we've changed our state.
          inputValue.addEventListener("change", async () => {

            // Find the option in our list and delete it if it exists.
            const optionRegex = new RegExp("^(?:Enable|Disable)\\." + checkbox.id + (!currentDevice ? "" : ("\\." + currentDevice.serial)) + "\\.[^\\.]+$", "gi");
            const newOptions = this.featureOptions.configuredOptions.filter(entry => !optionRegex.test(entry));

            if(checkbox.checked) {

              newOptions.push("Enable." + checkbox.value + "." + inputValue.value);
            } else if(checkbox.indeterminate) {

              // If we're in an indeterminate state, we need to traverse the tree to get the upstream value we're inheriting.
              inputValue.value = (currentDevice?.serial !== this.controller) ?
                (this.featureOptions.value(checkbox.id, this.controller) ?? this.featureOptions.value(checkbox.id)) :
                (this.featureOptions.value(checkbox.id) ?? option.defaultValue);
            } else {

              inputValue.value = option.defaultValue;
            }

            // Update our configuration in Homebridge.
            this.currentConfig[0].options = newOptions;
            this.featureOptions.configuredOptions = newOptions;
            await homebridge.updatePluginConfig(this.currentConfig);
          });

          tdInput.appendChild(inputValue);
          trX.appendChild(tdInput);
        }

        // Create a label for the checkbox with our option description.
        const labelDescription = document.createElement("label");

        labelDescription.for = checkbox.id;
        labelDescription.style.cursor = "pointer";
        labelDescription.classList.add("user-select-none", "my-0", "py-0");

        // Highlight options for the user that are different than our defaults.
        const scopeColor = this.featureOptions.color(featureOption, currentDevice?.serial, this.controller);

        if(scopeColor) {

          labelDescription.classList.add(scopeColor);
        }

        // Add or remove the setting from our configuration when we've changed our state.
        checkbox.addEventListener("change", async () => {

          // Find the option in our list and delete it if it exists.
          const optionRegex = new RegExp("^(?:Enable|Disable)\\." + checkbox.id + (!currentDevice ? "" : ("\\." + currentDevice.serial)) + "$", "gi");
          const newOptions = this.featureOptions.configuredOptions.filter(entry => !optionRegex.test(entry));

          // Figure out if we've got the option set upstream.
          let upstreamOption = false;

          // We explicitly want to check for the scope of the feature option above where we are now, so we can appropriately determine what we should show.
          switch(this.featureOptions.scope(checkbox.id, (currentDevice && (currentDevice.serial !== this.controller)) ? this.controller : undefined)) {

            case "device":
            case "controller":

              if(currentDevice.serial !== this.controller) {

                upstreamOption = true;
              }

              break;

            case "global":

              if(currentDevice) {

                upstreamOption = true;
              }

              break;

            default:

              break;
          }

          // For value-centric feature options, if there's an upstream value assigned above us, we don't allow for an unchecked state as it doesn't make sense in this
          // context.
          if(checkbox.readOnly && (!this.featureOptions.isValue(featureOption) || (this.featureOptions.isValue(featureOption) && inputValue && !upstreamOption))) {

            // We're truly unchecked. We need this because a checkbox can be in both an unchecked and indeterminate simultaneously,
            // so we use the readOnly property to let us know that we've just cycled from an indeterminate state.
            checkbox.checked = checkbox.readOnly = false;
          } else if(!checkbox.checked) {

            // If we have an upstream option configured, we reveal a third state to show inheritance of that option and allow the user to select it.
            if(upstreamOption) {

              // We want to set the readOnly property as well, since it will survive a user interaction when they click the checkbox to clear out the
              // indeterminate state. This allows us to effectively cycle between three states.
              checkbox.readOnly = checkbox.indeterminate = true;
            }

            if(this.featureOptions.isValue(featureOption) && inputValue) {

              inputValue.readOnly = true;
            }
          } else if(checkbox.checked) {

            // We've explicitly checked this option.
            checkbox.readOnly = checkbox.indeterminate = false;

            if(this.featureOptions.isValue(featureOption) && inputValue) {

              inputValue.readOnly = false;
            }
          }

          // The setting is different from the default, highlight it for the user, accounting for upstream scope, and add it to our configuration.
          if(!checkbox.indeterminate && ((checkbox.checked !== option.default) || upstreamOption)) {

            labelDescription.classList.add("text-info");
            newOptions.push((checkbox.checked ? "Enable." : "Disable.") + checkbox.value);
          } else {

            // We've reset to the defaults, remove our highlighting.
            labelDescription.classList.remove("text-info");
          }

          // Update our Homebridge configuration.
          if(this.featureOptions.isValue(featureOption) && inputValue) {

            // Inform our value-centric feature option to update Homebridge.
            const changeEvent = new Event("change");

            inputValue.dispatchEvent(changeEvent);
          } else {

            // Update our configuration in Homebridge.
            this.currentConfig[0].options = newOptions;
            this.featureOptions.configuredOptions = newOptions;
            await homebridge.updatePluginConfig(this.currentConfig);
          }

          // If we've reset to defaults, make sure our color coding for scope is reflected.
          if((checkbox.checked === option.default) || checkbox.indeterminate) {

            const scopeColor = this.featureOptions.color(featureOption, currentDevice?.serial, this.controller);

            if(scopeColor) {

              labelDescription.classList.add(scopeColor);
            }
          }

          // Adjust visibility of other feature options that depend on us.
          if(this.featureOptions.groups[checkbox.id]) {

            const entryVisibility = this.featureOptions.test(featureOption, currentDevice?.serial) ? "" : "none";

            // Lookup each feature option setting and set the visibility accordingly.
            for(const entry of this.featureOptions.groups[checkbox.id]) {

              document.getElementById("row-" + entry).style.display = entryVisibility;
            }
          }
        });

        // Add the actual description for the option after the checkbox.
        labelDescription.appendChild(document.createTextNode(option.description));

        // Add the label to the table cell.
        tdLabel.appendChild(labelDescription);

        // Provide a cell-wide target to click on options.
        tdLabel.addEventListener("click", () => checkbox.click());

        // Add the label table cell to the table row.
        trX.appendChild(tdLabel);

        // Adjust the visibility of the feature option, if it's logically grouped.
        if((option.group !== undefined) && !this.featureOptions.test(category.name + (option.group.length ? ("." + option.group) : ""), currentDevice?.serial)) {

          trX.style.display = "none";
        } else {

          // Increment the visible option count.
          optionsVisibleCount++;
        }

        // Add the table row to the table body.
        tbody.appendChild(trX);
      }

      // Add the table body to the table.
      optionTable.appendChild(tbody);

      // If we have no options visible in a given category, then hide the entire category.
      if(!optionsVisibleCount) {

        optionTable.style.display = "none";
      }

      // Add the table to the page.
      this.configTable.appendChild(optionTable);
    }

    homebridge.hideSpinner();
  }

  // Our default device information panel handler.
  #showDeviceInfoPanel(device) {

    const deviceFirmware = document.getElementById("device_firmware") ?? {};
    const deviceSerial = document.getElementById("device_serial") ?? {};

    // No device specified, we must be in a global context.
    if(!device) {

      deviceFirmware.innerHTML = "N/A";
      deviceSerial.innerHTML = "N/A";

      return;
    }

    // Display our device details.
    deviceFirmware.innerHTML = device.firmwareVersion;
    deviceSerial.innerHTML = device.serial;
  }

  // Default method for enumerating the device list in the sidebar.
  #showSidebarDevices() {

    // Show the devices list only if we have actual devices to show.
    if(!this.devices?.length) {

      return;
    }

    // Create a row for this device category.
    const trCategory = document.createElement("tr");

    // Disable any pointer events and hover activity.
    trCategory.style.pointerEvents = "none";

    // Create the cell for our device category row.
    const tdCategory = document.createElement("td");

    tdCategory.classList.add("m-0", "p-0", "pl-1", "w-100");

    // Add the category name, with appropriate casing.
    tdCategory.appendChild(document.createTextNode(this.sidebar.deviceLabel));
    tdCategory.style.fontWeight = "bold";

    // Add the cell to the table row.
    trCategory.appendChild(tdCategory);

    // Add the table row to the table.
    this.devicesTable.appendChild(trCategory);

    for(const device of this.devices) {

      // Create a row for this device.
      const trDevice = document.createElement("tr");

      trDevice.classList.add("m-0", "p-0");

      // Create a cell for our device.
      const tdDevice = document.createElement("td");

      tdDevice.classList.add("m-0", "p-0", "w-100");

      const label = document.createElement("label");

      label.name = device.serial;
      label.appendChild(document.createTextNode(device.name ?? "Unknown"));
      label.style.cursor = "pointer";
      label.classList.add("mx-2", "my-0", "p-0", "w-100");

      label.addEventListener("click", () => this.showDeviceOptions(device.serial));

      // Add the device label to our cell.
      tdDevice.appendChild(label);

      // Add the cell to the table row.
      trDevice.appendChild(tdDevice);

      // Add the table row to the table.
      this.devicesTable.appendChild(trDevice);

      this.webUiDeviceList.push(label);
    }
  }

  // Default method for retrieving the device list from the Homebridge accessory cache.
  async #getHomebridgeDevices() {

    // Retrieve the full list of cached accessories.
    let devices = await homebridge.getCachedAccessories();

    // Filter out only the components we're interested in.
    devices = devices.map(device => ({

      firmwareVersion: (device.services.find(service => service.constructorName ===
        "AccessoryInformation")?.characteristics.find(characteristic => characteristic.constructorName === "FirmwareRevision")?.value ?? ""),
      name: device.displayName,
      serial: (device.services.find(service => service.constructorName ===
        "AccessoryInformation")?.characteristics.find(characteristic => characteristic.constructorName === "SerialNumber")?.value ?? "")
    }));

    // Sort it for posterity.
    devices.sort((a, b) => {

      const aCase = (a.name ?? "").toLowerCase();
      const bCase = (b.name ?? "").toLowerCase();

      return aCase > bCase ? 1 : (bCase > aCase ? -1 : 0);
    });

    // Return the list.
    return devices;
  }
}
