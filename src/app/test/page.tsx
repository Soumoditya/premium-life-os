export default function TestPage() {
    return (
        <div style={{ padding: 50, background: 'black', color: 'white' }}>
            <h1>Deployment Test</h1>
            <p>Version: v3.1</p>
            <p>Time: {new Date().toISOString()}</p>
        </div>
    );
}
