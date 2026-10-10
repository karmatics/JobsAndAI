/**
 * Forwarding alias: AiPerspectivePage renders GraphicsVideoPage to maintain
 * backwards compatibility across existing routes and references.
 */
class AiPerspectivePage extends GraphicsVideoPage {}

window.AiPerspectivePage = AiPerspectivePage;
globalThis.AiPerspectivePage = AiPerspectivePage;