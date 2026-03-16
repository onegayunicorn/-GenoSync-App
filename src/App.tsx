/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          GenoSync-Frontier
        </h1>
      </header>
      
      <main className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)]">
        {/* Sidebar */}
        <aside className="col-span-3 glass-panel rounded-2xl p-6">
          <h2 className="text-cyan-400 font-bold mb-4">Repository Explorer</h2>
          {/* Sidebar content will go here */}
        </aside>

        {/* Visualizer */}
        <section className="col-span-9 glass-panel rounded-2xl p-6">
          <h2 className="text-purple-400 font-bold mb-4">Genomic Visualizer</h2>
          {/* Visualizer content will go here */}
        </section>
      </main>
    </div>
  );
}
