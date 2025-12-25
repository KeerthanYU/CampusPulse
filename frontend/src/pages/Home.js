import React from 'react';

const Home = () => (
	<div className="home-panel-content">
		<div className="hero-prompt panel">
			<div>
				<h2 style={{margin:0}}>Hi — ready to get started?</h2>
				<p className="muted" style={{marginTop:8}}>Ask CampusPulse anything about your campus — schedules, events, resources, and more.</p>
			</div>

			<div className="prompt-input">
				<input type="text" placeholder="Ask CampusPulse..." style={{width:'100%',border:'none',outline:'none',fontSize:16}} />
				<div className="chips">
					<div className="chip">Create image</div>
					<div className="chip">Write anything</div>
					<div className="chip">Help me learn</div>
					<div className="chip">Boost my day</div>
				</div>
			</div>
		</div>

		<div style={{marginTop:18}}>
			<strong>Quick actions</strong>
			<ul style={{ marginTop: 8, color: 'var(--muted)', paddingLeft: 18 }}>
				<li>Search courses</li>
				<li>View events</li>
				<li>Ask AI for help</li>
			</ul>
		</div>
	</div>
);

export default Home;
