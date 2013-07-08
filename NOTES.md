Tooling Analysis
================
I need to write a small Javascript library, and I want to divide the code into several source files for maintainability. This library happens to build upon other libraries (jQuery, Backbone, etc.), but I will not package these for the user (dependency management, compilation, and versioning will be the user's sole responsibility). 

For this project, it is necessary to develop modular code without imposing additional legwork upon the client (the browser being the ultimate consumer). Excessive HTTP transfers or extraneous CPU cycles should be avoided. Several AMD options were considered, but they are all lacking for my purposes as detailed below. Several build dependency tools were compared, and they appear to be superior options.

Build Tool Comparison
---------------------
**RequireJS**

* Good: Modular, dependency loading, robust inline specification, global namespace protected.
* Bad: Tons of HTTP requests in development. Upon compilation it is impossible to remove require()/define() calls--ultimate dealbreaker. Waste of bandwidth and client CPU!

**Almond (with RequireJS)**

* Good: Removes require.js as a library requirement by wrapping AMD code in minimal Almond boilerplate.
* Bad: Almond boilerplate is still overhead! Wastes client CPU cycles needlessly. This stuff should be removed at compile time, not runtime. 

**Grunt-Concat (by itself)**

* Good: No added r.js cruft
* Bad: Can't manage dependency graph. Files are blindly concatenated as listed.

**Grunt-Dependency-Sort**

* Good: ???
* Bad: Terrible docs. Terrible configuration (JSON file per directory); no inline dependency specification!

**Grunt-Neuter**

* Good: Sorts out dependencies with inline "require()" declaration. Can wrap each source file with a template.
* Bad: "require()" isn't real, it's just an exploded regex match. There's no way to define exports. There's no way to set up or utilize namespaces. Still, this is better than the alternatives seen thus far.

Closing Notes
-------------
The decisions I reach here may not have bearing on your project/needs. I was not able to survey the entire Node/Grunt/AMD/etc. landscape and may have missed some important projects. Additionally, these decisions will likely become stale as time progresses. 

