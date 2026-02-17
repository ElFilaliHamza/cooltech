/**
 * CoolTech showcase data – flat list for search and grid.
 * Minimal set for testing; expand with full desktopTech, myFavoriteApps, etc. later.
 * Each item: id, name, category, description (required for Fuse + semantic search).
 */
const APPS = [
	{
		id: "bcuninstaller",
		name: "BCUninstaller",
		category: "Uninstaller",
		description:
			"BCUninstaller (Bulk Crap Uninstaller) is a free and open-source uninstaller for Windows that can also be used on Linux through Wine or similar compatibility layers.",
	},
	{
		id: "wiztree",
		name: "WizTree",
		category: "File Manager",
		description: "WizTree is a free and open-source file manager.",
	},
	{
		id: "protonvpn",
		name: "ProtonVPN",
		category: "VPN",
		description:
			"ProtonVPN is a free and open-source virtual private network (VPN) service for Linux.",
	},
	{
		id: "topgrade",
		name: "Topgrade",
		category: "Package Manager",
		description:
			"Topgrade detects all package managers and tools on your system and updates everything with a single command.",
	},
	{
		id: "ventoy",
		name: "Ventoy",
		category: "Bootable USB Drive",
		description:
			"Open-source tool for creating bootable USB drives that can hold multiple ISO/WIM/IMG files at once.",
	},
	{
		id: "flameshot",
		name: "Flameshot",
		category: "Screenshot Tool",
		description:
			"Powerful yet simple to use screenshot software. Recently received its first major update in 3 years (v13).",
	},
	{
		id: "vlc",
		name: "VLC",
		category: "Media Player",
		description:
			"A free and open-source portable cross-platform media player software and streaming media server.",
	},
	{
		id: "vscode",
		name: "VS Code",
		category: "Code Editor",
		description:
			"A free source-code editor made by Microsoft for Windows, Linux and macOS.",
	},
	{
		id: "bitwarden",
		name: "BitWarden",
		category: "Password Manager",
		description: "A free and open-source password management service.",
	},
	{
		id: "localsend",
		name: "LocalSend",
		category: "File Transfer",
		description:
			"Free, open-source app to securely share files and messages to devices on your local network.",
	},
];

export default APPS;
