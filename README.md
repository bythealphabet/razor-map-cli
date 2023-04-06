#Razor Map CLI

Razor Map CLI is a command-line interface (CLI) tool designed to analyze Razor project files and output a map of relationships between views and partials. It is built using Node.js, TypeScript, and the yargs package for parsing command-line options.

The tool specifically targets .cshtml files within a specified folder (default is "Pages"), looking for @await Html.PartialAsync() calls and printing the relationships between views and partials in a tree-like structure. The output provides an easy-to-understand visual representation of the relationships between views and partials, making it easier to navigate and understand the project structure without the need to manually inspect each file.

##Key Features
Analyzes Razor project files, searching for @await Html.PartialAsync() calls
Outputs a map of relationships between views and partials in a tree-like structure
Allows users to specify a custom folder containing the .cshtml files
Built with Node.js, TypeScript, and yargs for command-line option parsing
Uses streams for efficient file processing

##Usage
To use the Razor Map CLI, simply run the command razor-map followed by any desired options. For example, to analyze a folder named "Views," run the command:

      //terminal
            razor-map -f Views

The tool will output a map of relationships between views and partials, providing a clear overview of the project structure.


