<h1 align=center>About InCA-WhatIsMore</h1>

A simple web solution to compare the ability of animals (humans and non humans) trained in using touch interfaces to compare discrete (e.g. dice, heap of dots) and continuous (e.g. disc, rectangle) quantities with distinct color settings and an automatic log (even in context difficult for humans, such as low contrasts), designed so that to make it easier to perform experiments in a "masked set-up", where the experimenter does not see the questions put to the subject, so that the subject cannot "read" any (involuntary) cue from the experimenter about which answer is correct.

<h2>Known bugs</h2>
<ul>
	<li> play page can still be scrolled</li>
	<li> HTML input in VisualFeedback is not sanitized! (e.g. using https://developer.mozilla.org/en-US/docs/Web/API/HTML_Sanitizer_API) </li>
</ul>

<h2>Pending Features</h2>
<ul>
	<li>Add Long press feature to Menu button</li>
	<li>Add separate parameters for visual display for exercises and games </li>
	<li>Record and configure separate audio feedback for exercises and games</li>
  <li>Display mode random dots (Felipe?)
  <li>Display mode random dots with gravity (Felipe?)
  <li> server side log 
	<li> client side automatic statistical analysis of the game log at the end of each log.</li>	
	<li> server side automatic statistical analysis of log per learner </li>
	<li> add option to upload (to the server?) personalized sounds for audio feedback.</li>
  <li> Random game modes: At each new GAME, draw a<ul>
   <li> random display mode, and/or
   <li> random colors and/or
   <li> random opacity 
	 </ul>
<li> Add statistic distance to results obtained from uniform random choices
<li> Add statistic distance to results obtained from always selecting the same
<li> min/max/median/Average Response time
<li> Add parameter to control the space between quantities in each exercise (Felipe?)
<li> high scores table
<li> make surface of rect and disc vary linearly with n (rather than quadratically) (Felipe?)
</ul>

<h3>
	Recently added features
</h3>
<ul>
	<li>replaced problematic mention of the term 'blind set-up' by 'masked set-up'</li>
	<li> Made the 4 icons on the front page clickable to start the game in the respective modes.</li>
	<li> Made parameters for games proportional to number of exercises in a game</li>
	<li> changed default sounds for "correct" and "incorrect" (currently set to"yes" and "no")</li>
	<li> added in parameters a button for "noMore" option and a url for "noMoreSoundURL"</li>
	<li> added button "No more" at demand of Jennifer for Elie.</li>
	<li>change name of local log to one which has the date in it.</li>
	<li> local log 
	<li> Add Game Length parameters and logic: one should not stop the game anytime but after a predetermined number of exercises.  <ul>
		<li>GameLength</li>
		<li>Thresholds GameEndExcellentThreshold, GameEndFailThreshold, GameEndPassThreshold</li>
		<li>Sounds GameEndExcellentSound, GameEndFailSound, GameEndPassSound</li>
		</ul> </li>
	<li>Add visual feedback (especially for when the sound is disactivated)</li>
<li> Make it harder for parrots to return to the menu
</ul>

<h2>How to use it?</h2>
<ul>
	<li><i>Teacher</i> selects parameters of the game in the menu <i>Configuration</i>;</li>
	<li><i>Teacher</i> selects <i>Play</i> and presents the device to the <i>learner</i>, in a position where the <i>teacher</i> cannot see the screen, to insure they cannot hint the correct answers to the <i>learner</i>;
	<li><i>Learner</i> selects one of the quantities described;</li>
	<li><i>Teacher</i> rewards <i>Learner</i> if appropriate while the application readies the next challenge.</li>
</ul>
<h2>
	Privacy issues
</h2>

<i>A lawyer should add here text saying that the user agree to share its usage data for scientific usage</i>

<h2>Related pages</h2>

Checkout the <a href='http://inca-bct.repositorium.cl'>server</a> and <a href='https://gitlab.com/incalab/inca-bct'>sources</a>.<br>	

<h2>Credits/Acknowledgments</h2>

<ul>
	<li><a href="https://barbay.cl">J�r�my Barbay</a> from <a href="https://inca.dcc.uchile.cl">InCA Labs</a> developped the original application and regularly maintained it;
	</li><li><a href="https://joachim.barbay.cl">Joachim Barbay</a> from <a href="https://jobbyworld.cl">Jobby World</a> suggested the use of Svelte and helped in many occasions with the development;
	</li><li><a href="https://international.iupui.edu/global-learning/curriculum-internationalization/ciz-advisory-committee/cori-renguette-ciz-profile.html">Cori Renguette</a> gave feedback about ethical aspects of the experimental protocol and about the potential issues around using the term "blind setup".</li>
</ul>

		