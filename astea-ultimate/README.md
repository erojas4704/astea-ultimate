# Astea Ultimate

How Astea gets an SV.

1. Execute a macro called retrieve. `https://alliance.microcenter.com/AsteaAlliance110/Web_Framework/BCBase.svc/ExecMacroUIExt`

2. Look at the body of the response for the StateID. This is how Astea internally references SVs.

3. Retrieve the hostname which will be used in interact with server. 

3. Get Service Order by executing "Interact With Server" subroutine. `https://alliance.microcenter.com//AsteaAlliance110/Web_Framework/BCBase.svc/InteractWithServerExt?<<HOSTNAME>>`

4. Profit?