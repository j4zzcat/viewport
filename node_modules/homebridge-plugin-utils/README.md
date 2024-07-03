<SPAN ALIGN="CENTER" STYLE="text-align:center">
<DIV ALIGN="CENTER" STYLE="text-align:center">

# Homebridge Plugin Utilities
[![Downloads](https://img.shields.io/npm/dt/homebridge-plugin-utils?color=%23491F59&logo=icloud&logoColor=%23FFFFFF&style=for-the-badge)](https://www.npmjs.com/package/homebridge-plugin-utils)
[![Version](https://img.shields.io/npm/v/homebridge-plugin-utils?color=%23491F59&label=Latest%20Version&logo=homebridge&logoColor=%23FFFFFF&style=for-the-badge)](https://www.npmjs.com/package/homebridge-plugin-utils)
[![Homebridge Discord](https://img.shields.io/discord/432663330281226270?color=%23491F59&label=Discord&logo=discord&logoColor=%23FFFFFF&style=for-the-badge)](https://discord.gg/QXqfHEW)
</DIV>
</SPAN>

`homebridge-plugin-utils` is a utility library for [Homebridge](https://homebridge.io) [plugins](https://developers.homebridge.io) that aims to provide a set of common core capabilities that can accelerate and streamline plugin development. It's opinionated and largely derived from my other plugins and my desire to increase code reuse and make it easier to provide rich capabilities across all my plugins so that each of my plugins can focus on providing their unique capabilities rather than copying over the same capabilities (feature options, MQTT support, and a rich webUI interface to name a few) time after time.

The design decisions are driven by my own needs as I continue to create, evolve, and maintain my plugins but I also wanted to provide these as a resource to others, should it be of interest.

### Features

- **Feature options*.* Feature options are a hierarchical configuration system and matching webUI that allows users to set global defaults and override them at a granular level, enabling easier mass-customization of capabilities. For plugins that can potentially enumerate dozens of devices, this comes in quite handy so you don't need to configure each and every device, and instead you can focus on the exceptions.

- **Configuration webUI.** This a rich, custom webUI for enumerating all the devices a plugin knows about, and configuring feature options.

- **MQTT client.** Building in MQTT client capabilities is made easier through a set of utilities that allow you to easily publish and subscribe to events.

- **And more...**

## Documentation
* Coming in the future.

## Plugin Development Dashboard
This is mostly of interest to the true developer nerds amongst us.

[![License](https://img.shields.io/npm/l/homebridge-plugin-utils?color=%23491F59&logo=open%20source%20initiative&logoColor=%23FFFFFF&style=for-the-badge)](https://github.com/hjdhjd/homebridge-plugin-utils/blob/main/LICENSE.md)
[![Build Status](https://img.shields.io/github/actions/workflow/status/hjdhjd/homebridge-plugin-utils/ci.yml?branch=main&color=%23491F59&logo=github-actions&logoColor=%23FFFFFF&style=for-the-badge)](https://github.com/hjdhjd/homebridge-plugin-utils/actions?query=workflow%3A%22Continuous+Integration%22)
[![Dependencies](https://img.shields.io/librariesio/release/npm/homebridge-plugin-utils?color=%23491F59&logo=dependabot&style=for-the-badge)](https://libraries.io/npm/homebridge-plugin-utils)
[![GitHub commits since latest release (by SemVer)](https://img.shields.io/github/commits-since/hjdhjd/homebridge-plugin-utils/latest?color=%23491F59&logo=github&sort=semver&style=for-the-badge)](https://github.com/hjdhjd/homebridge-plugin-utils/commits/main)
