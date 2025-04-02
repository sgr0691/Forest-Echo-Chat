"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, Check, Info, Key, Trash2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { List, Code, Search, Globe, FileText } from "lucide-react"

// This would be the interface between our React UI and Swift backend
interface SwiftBridge {
  // Provider management
  getProviders: () => Promise<any[]>
  addProvider: (provider: any) => Promise<boolean>
  removeProvider: (providerId: string) => Promise<boolean>

  // Tool management
  getTools: () => Promise<any[]>
  installTool: (toolId: string) => Promise<boolean>
  uninstallTool: (toolId: string) => Promise<boolean>

  // Settings management
  getSettings: () => Promise<any>
  updateSettings: (settings: any) => Promise<boolean>

  // API key management
  saveAPIKey: (service: string, key: string) => Promise<boolean>
  getAPIKey: (service: string) => Promise<string>
  deleteAPIKey: (service: string) => Promise<boolean>
}

// Mock implementation that would connect to Swift code
const swiftBridge: SwiftBridge = {
  // These functions would actually call into the Swift code via a bridge
  getProviders: async () => {
    // In a real implementation, this would call:
    // ChatViewModel.shared.providers
    console.log("Swift: Getting providers from ChatViewModel")
    return [
      {
        id: "anthropic",
        name: "Claude (Anthropic)",
        displayName: "Claude (Anthropic)",
        apiKey: "••••••••••••••••",
        modelName: "claude-3-opus-20240229",
      },
      {
        id: "openai",
        name: "openai",
        displayName: "GPT (OpenAI)",
        apiKey: "••••••••••••••••",
        modelName: "gpt-4o",
      },
    ]
  },

  addProvider: async (provider) => {
    // In a real implementation, this would call:
    // ChatViewModel.shared.addProvider(provider)
    console.log("Swift: Adding provider to ChatViewModel", provider)
    return true
  },

  removeProvider: async (providerId) => {
    // In a real implementation, this would call:
    // ChatViewModel.shared.removeProvider(provider)
    console.log("Swift: Removing provider from ChatViewModel", providerId)
    return true
  },

  getTools: async () => {
    // In a real implementation, this would call:
    // ChatViewModel.shared.installedTools
    console.log("Swift: Getting tools from ChatViewModel")
    return [
      {
        id: "1",
        name: "Summarizer",
        description: "Summarizes long text into concise points",
        iconName: "list.bullet",
        isInstalled: true,
      },
      {
        id: "2",
        name: "Code Analyzer",
        description: "Analyzes and explains code snippets",
        iconName: "chevron.left.forwardslash.chevron.right",
        isInstalled: true,
      },
      {
        id: "3",
        name: "Knowledge Base",
        description: "Searches through your local knowledge base",
        iconName: "magnifyingglass",
        isInstalled: false,
      },
    ]
  },

  installTool: async (toolId) => {
    // In a real implementation, this would call:
    // ChatViewModel.shared.installTool(tool)
    console.log("Swift: Installing tool in ChatViewModel", toolId)
    return true
  },

  uninstallTool: async (toolId) => {
    // In a real implementation, this would call:
    // ChatViewModel.shared.uninstallTool(tool)
    console.log("Swift: Uninstalling tool from ChatViewModel", toolId)
    return true
  },

  getSettings: async () => {
    // In a real implementation, this would access Swift UserDefaults or similar
    console.log("Swift: Getting settings from UserDefaults")
    return {
      saveConversations: true,
      defaultProvider: "anthropic",
    }
  },

  updateSettings: async (settings) => {
    // In a real implementation, this would update Swift UserDefaults
    console.log("Swift: Updating settings in UserDefaults", settings)
    return true
  },

  saveAPIKey: async (service, key) => {
    // In a real implementation, this would call:
    // KeychainManager.shared.saveAPIKey(key, for: service)
    console.log(`Swift: Saving API key for ${service} to Keychain`)
    return true
  },

  getAPIKey: async (service) => {
    // In a real implementation, this would call:
    // KeychainManager.shared.getAPIKey(for: service)
    console.log(`Swift: Getting API key for ${service} from Keychain`)
    return "sk-••••••••••••••••"
  },

  deleteAPIKey: async (service) => {
    // In a real implementation, this would call:
    // KeychainManager.shared.deleteAPIKey(for: service)
    console.log(`Swift: Deleting API key for ${service} from Keychain`)
    return true
  },
}

export function SettingsPanel() {
  // Add a function to get available models for each provider
  const getModelsForProvider = (providerType: string) => {
    switch (providerType) {
      case "anthropic":
        return [
          { id: "claude-3-opus-20240229", name: "Claude 3 Opus" },
          { id: "claude-3-sonnet-20240229", name: "Claude 3 Sonnet" },
          { id: "claude-3-haiku-20240307", name: "Claude 3 Haiku" },
          { id: "claude-2.1", name: "Claude 2.1" },
          { id: "claude-2.0", name: "Claude 2.0" },
        ]
      case "openai":
        return [
          { id: "gpt-4o", name: "GPT-4o" },
          { id: "gpt-4-turbo", name: "GPT-4 Turbo" },
          { id: "gpt-4", name: "GPT-4" },
          { id: "gpt-3.5-turbo", name: "GPT-3.5 Turbo" },
        ]
      case "cohere":
        return [
          { id: "command-r-plus", name: "Command R+" },
          { id: "command-r", name: "Command R" },
          { id: "command", name: "Command" },
        ]
      case "custom":
        return []
      default:
        return []
    }
  }

  // Add API key validation function
  const validateApiKey = (provider: string, key: string) => {
    if (!key.trim()) return { valid: false, message: "API key is required" }

    // Basic validation patterns for different providers
    switch (provider) {
      case "anthropic":
        if (!key.startsWith("sk-ant-")) {
          return { valid: false, message: "Anthropic API keys should start with 'sk-ant-'" }
        }
        break
      case "openai":
        if (!key.startsWith("sk-")) {
          return { valid: false, message: "OpenAI API keys should start with 'sk-'" }
        }
        break
      case "cohere":
        if (key.length < 30) {
          return { valid: false, message: "Cohere API keys should be at least 30 characters" }
        }
        break
    }

    return { valid: true, message: "Valid API key" }
  }

  // State for providers
  const [providers, setProviders] = useState<any[]>([])
  // Update the newProvider state to include a models array for dropdown options
  const [newProvider, setNewProvider] = useState({
    type: "anthropic",
    apiKey: "",
    modelName: "claude-3-opus-20240229",
    models: getModelsForProvider("anthropic"),
  })

  // State for tools
  const [tools, setTools] = useState<any[]>([])

  // State for general settings
  const [settings, setSettings] = useState({
    saveConversations: true,
    defaultProvider: "anthropic",
  })

  // State for UI
  const [isLoading, setIsLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  // State for API key validation
  const [apiKeyValidation, setApiKeyValidation] = useState({ valid: true, message: "" })

  // Load data from Swift backend
  const loadData = async () => {
    setIsLoading(true)
    try {
      const [providersData, toolsData, settingsData] = await Promise.all([
        swiftBridge.getProviders(),
        swiftBridge.getTools(),
        swiftBridge.getSettings(),
      ])

      setProviders(providersData)
      setTools(toolsData)
      setSettings(settingsData)
    } catch (error) {
      setErrorMessage("Failed to load settings data")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Add this useEffect near the top of the component, after the state declarations
  useEffect(() => {
    // Load initial data when component mounts
    loadData()
  }, [])

  // Add a new provider
  const handleAddProvider = async () => {
    // Validate API key first
    const validation = validateApiKey(newProvider.type, newProvider.apiKey)
    setApiKeyValidation(validation)

    if (!validation.valid) {
      setErrorMessage(validation.message)
      return
    }

    setIsLoading(true)
    try {
      // First save the API key to the keychain via Swift
      await swiftBridge.saveAPIKey(`com.chatclient.provider.${newProvider.type}`, newProvider.apiKey)

      // Then add the provider configuration
      const success = await swiftBridge.addProvider({
        id: Date.now().toString(),
        name: newProvider.type,
        displayName: getProviderDisplayName(newProvider.type),
        modelName: newProvider.modelName,
      })

      if (success) {
        setSuccessMessage("Provider added successfully")
        // Reload providers
        const updatedProviders = await swiftBridge.getProviders()
        setProviders(updatedProviders)
        // Reset form
        setNewProvider({
          type: "anthropic",
          apiKey: "",
          modelName: "claude-3-opus-20240229",
          models: getModelsForProvider("anthropic"),
        })
        setApiKeyValidation({ valid: true, message: "" })
      }
    } catch (error) {
      setErrorMessage("Failed to add provider")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Add a function to handle API key input keydown
  const handleApiKeyKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddProvider()
    }
  }

  // Remove a provider
  const handleRemoveProvider = async (providerId: string) => {
    setIsLoading(true)
    try {
      const success = await swiftBridge.removeProvider(providerId)

      if (success) {
        setSuccessMessage("Provider removed successfully")
        // Reload providers
        const updatedProviders = await swiftBridge.getProviders()
        setProviders(updatedProviders)
      }
    } catch (error) {
      setErrorMessage("Failed to remove provider")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Install/uninstall a tool
  const handleToggleTool = async (tool: any) => {
    setIsLoading(true)
    try {
      let success

      if (tool.isInstalled) {
        success = await swiftBridge.uninstallTool(tool.id)
      } else {
        success = await swiftBridge.installTool(tool.id)
      }

      if (success) {
        setSuccessMessage(`Tool ${tool.isInstalled ? "uninstalled" : "installed"} successfully`)
        // Reload tools
        const updatedTools = await swiftBridge.getTools()
        setTools(updatedTools)
      }
    } catch (error) {
      setErrorMessage(`Failed to ${tool.isInstalled ? "uninstall" : "install"} tool`)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Update settings
  const handleUpdateSettings = async () => {
    setIsLoading(true)
    try {
      const success = await swiftBridge.updateSettings(settings)

      if (success) {
        setSuccessMessage("Settings updated successfully")
      }
    } catch (error) {
      setErrorMessage("Failed to update settings")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to get display name for provider
  const getProviderDisplayName = (type: string) => {
    switch (type) {
      case "anthropic":
        return "Claude (Anthropic)"
      case "openai":
        return "GPT (OpenAI)"
      case "cohere":
        return "Cohere"
      case "custom":
        return "Custom Provider"
      default:
        return type
    }
  }

  // Helper function to get default model for provider
  const getDefaultModel = (type: string) => {
    switch (type) {
      case "anthropic":
        return "claude-3-opus-20240229"
      case "openai":
        return "gpt-4o"
      case "cohere":
        return "command-r-plus"
      default:
        return ""
    }
  }

  // Update the onChange handler for provider type to update models
  const handleProviderTypeChange = (value: string) => {
    const models = getModelsForProvider(value)
    const defaultModel = models.length > 0 ? models[0].id : ""

    setNewProvider({
      ...newProvider,
      type: value,
      modelName: defaultModel,
      models: models,
    })

    // Reset validation state when changing provider
    setApiKeyValidation({ valid: true, message: "" })
  }

  return (
    <Tabs defaultValue="api-keys" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="api-keys">API Keys</TabsTrigger>
        <TabsTrigger value="tools">Tools</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
      </TabsList>

      {/* Success/Error Messages */}
      {successMessage && (
        <Alert className="mt-4 bg-green-50 border-green-200">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert className="mt-4 bg-red-50 border-red-200">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* API Keys Tab */}
      <TabsContent value="api-keys" className="space-y-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle>Configure LLM Providers</CardTitle>
            <CardDescription>Manage your AI model providers and API keys</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Current Providers</h3>
              {providers.map((provider) => (
                <div key={provider.id} className="flex items-center justify-between p-3 border rounded-md">
                  <div className="flex items-center gap-2">
                    <Key className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{provider.displayName}</p>
                      <p className="text-xs text-muted-foreground">Model: {provider.modelName}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{provider.apiKey ? "Configured" : "No API Key"}</Badge>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveProvider(provider.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium">Add New Provider</h3>

              <div className="grid gap-2">
                <Label htmlFor="provider-type">Provider</Label>
                <Select value={newProvider.type} onValueChange={handleProviderTypeChange}>
                  <SelectTrigger id="provider-type">
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="anthropic">Claude (Anthropic)</SelectItem>
                    <SelectItem value="openai">GPT (OpenAI)</SelectItem>
                    <SelectItem value="cohere">Cohere</SelectItem>
                    <SelectItem value="custom">Custom Provider</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="model-name">Model</Label>
                {newProvider.models.length > 0 ? (
                  <Select
                    value={newProvider.modelName}
                    onValueChange={(value) => setNewProvider({ ...newProvider, modelName: value })}
                  >
                    <SelectTrigger id="model-name">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {newProvider.models.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Input
                    id="model-name"
                    placeholder="Model Name"
                    value={newProvider.modelName}
                    onChange={(e) => setNewProvider({ ...newProvider, modelName: e.target.value })}
                  />
                )}
                <p className="text-xs text-muted-foreground">
                  {newProvider.type === "custom"
                    ? "Enter the model identifier for your custom provider"
                    : "Select the model you want to use for this provider"}
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="api-key" className="flex items-center justify-between">
                  <span>API Key</span>
                  {apiKeyValidation.message && !apiKeyValidation.valid && (
                    <span className="text-xs text-red-500">{apiKeyValidation.message}</span>
                  )}
                </Label>
                <Input
                  id="api-key"
                  type="password"
                  placeholder="Enter API Key"
                  value={newProvider.apiKey}
                  onChange={(e) => {
                    setNewProvider({ ...newProvider, apiKey: e.target.value })
                    // Clear validation messages when typing
                    if (apiKeyValidation.message) {
                      setApiKeyValidation({ valid: true, message: "" })
                    }
                  }}
                  onKeyDown={handleApiKeyKeyDown}
                  className={!apiKeyValidation.valid ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                <p className="text-xs text-muted-foreground">Your API key is securely stored in the system keychain</p>
              </div>

              <Button
                className="w-full"
                onClick={handleAddProvider}
                disabled={isLoading || !newProvider.apiKey || !newProvider.modelName}
              >
                Add Provider
              </Button>
            </div>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Alert variant="outline" className="w-full">
              <Info className="h-4 w-4" />
              <AlertDescription>
                API keys are stored securely in your system keychain using Swift's KeychainManager
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Tools Tab */}
      <TabsContent value="tools" className="space-y-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle>Manage Tools</CardTitle>
            <CardDescription>Install and configure AI tools and extensions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {tools.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-3 border rounded-md">
                <div className="flex items-center gap-2">
                  <div className="p-1 bg-primary/10 rounded flex items-center justify-center w-8 h-8">
                    {tool.iconName === "list.bullet" && <List className="h-4 w-4" />}
                    {tool.iconName === "chevron.left.forwardslash.chevron.right" && <Code className="h-4 w-4" />}
                    {tool.iconName === "magnifyingglass" && <Search className="h-4 w-4" />}
                    {tool.iconName === "globe" && <Globe className="h-4 w-4" />}
                    {tool.iconName === "doc.text" && <FileText className="h-4 w-4" />}
                    {![
                      "list.bullet",
                      "chevron.left.forwardslash.chevron.right",
                      "magnifyingglass",
                      "globe",
                      "doc.text",
                    ].includes(tool.iconName) && <span className="text-xs font-mono">{tool.iconName}</span>}
                  </div>
                  <div>
                    <p className="font-medium">{tool.name}</p>
                    <p className="text-xs text-muted-foreground">{tool.description}</p>
                  </div>
                </div>
                <Button
                  variant={tool.isInstalled ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleToggleTool(tool)}
                >
                  {tool.isInstalled ? "Uninstall" : "Install"}
                </Button>
              </div>
            ))}
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Alert variant="outline" className="w-full">
              <Info className="h-4 w-4" />
              <AlertDescription>
                Tools are implemented in Swift and managed by the MCPToolProtocol system
              </AlertDescription>
            </Alert>
          </CardFooter>
        </Card>
      </TabsContent>

      {/* General Settings Tab */}
      <TabsContent value="general" className="space-y-4 py-4">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Configure application preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="save-conversations">Save Conversations</Label>
                <p className="text-xs text-muted-foreground">Store chat history locally on your device</p>
              </div>
              <Switch
                id="save-conversations"
                checked={settings.saveConversations}
                onCheckedChange={(checked) => setSettings({ ...settings, saveConversations: checked })}
              />
            </div>

            <Separator />

            {/* Replace the Default Provider section with this improved version: */}
            <div className="grid gap-2">
              <Label htmlFor="default-provider">Default Provider</Label>
              {providers.length > 0 ? (
                <Select
                  value={settings.defaultProvider}
                  onValueChange={(value) => setSettings({ ...settings, defaultProvider: value })}
                >
                  <SelectTrigger id="default-provider">
                    <SelectValue placeholder="Select default provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {providers.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.displayName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <div className="flex items-center justify-between">
                  <Input value="No providers available" disabled className="text-muted-foreground" />
                  <Button variant="outline" size="sm" className="ml-2" onClick={loadData}>
                    Refresh
                  </Button>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                This provider will be used by default for new conversations
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between border-t px-6 py-4">
            <Button variant="outline">Reset to Defaults</Button>
            <Button onClick={handleUpdateSettings}>Save Changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

