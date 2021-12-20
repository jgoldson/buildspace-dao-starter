import { ethers } from "ethers";

// import thirdweb
import { useWeb3 } from "@3rdweb/hooks";
import { ThirdwebSDK } from "@3rdweb/sdk";

import React from "react"
import {useState} from "react"

const sdk = new ThirdwebSDK("rinkeby");

// Our voting contract.
const voteModule = sdk.getVoteModule(
  "0x28cBDF2f39958820ba42F342cbb7DeBc19564dcb",
);

// Our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x037CD0dD0efc916dA852cE2e0Ea048563Ce1518D",
);



export default function CreateProposal() {

    constructor() {
        super();
    
        this.state = {
          color: 'green'
        };
    
        this.onRadioChange = this.onRadioChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
      }
    
      onRadioChange = (e) => {
        this.setState({
          color: e.target.value
        });
      }
    
      onSubmit = (e) => {
        e.preventDefault();
        console.log(this.state);
      }

    const generateNewMintProposal = async (tokenAmount) => {
        try {
          const amount = tokenAmount;
          
          await voteModule.propose(
            "Should the DAO mint an additional " + amount + " tokens into the treasury?",
            [
              {
                // Our nativeToken is ETH. nativeTokenValue is the amount of ETH we want
                // to send in this proposal. In this case, we're sending 0 ETH.
                // We're just minting new tokens to the treasury. So, set to 0.
                nativeTokenValue: 0,
                transactionData: tokenModule.contract.interface.encodeFunctionData(
                  // We're doing a mint! And, we're minting to the voteModule, which is
                  // acting as our treasruy.
                  "mint",
                  [
                    voteModule.address,
                    ethers.utils.parseUnits(amount.toString(), 18),
                  ]
                ),
                // Our token module that actually executes the mint.
                toAddress: tokenModule.address,
              },
            ]
          );
      
          console.log("✅ Successfully created proposal to mint tokens");
        } catch (error) {
          console.error("failed to create first proposal", error);
          
        }
    }
    const generateTransferProposal = async (tokenAmount, address ) => {
        try {
          const amount = tokenAmount;
          // Create proposal to transfer ourselves 6,900 token for being awesome.
          await voteModule.propose(
            "Should the DAO transfer " +
            amount + " tokens from the treasury to " +
            address,
            [
              {
                // Again, we're sending ourselves 0 ETH. Just sending our own token.
                nativeTokenValue: 0,
                transactionData: tokenModule.contract.interface.encodeFunctionData(
                  // We're doing a transfer from the treasury to our wallet.
                  "transfer",
                  [
                    address,
                    ethers.utils.parseUnits(amount.toString(), 18),
                  ]
                ),
      
                toAddress: tokenModule.address,
              },
            ]
          );
      
          console.log(
            "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
          );
        } catch (error) {
          console.error("failed to create first proposal", error);
        }
      }


    return (
        <div className="container">
            <div className="row">
                <div className="row-sm-12">
                <h2>Create New Proposal</h2>
                    <form>
                        <div className="radio">
                        <label>
                            <input type="radio" value="option1" 
                                        checked={selectedOption === "option1"} 
                                        onChange={handleOptionChange()} />
                            New Proposal
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" value="option2" 
                                        checked={selectedOption === "option2"} 
                                        onChange={handleOptionChange()} />
                            Transfer Tokens
                        </label>
                        </div>
                        <div className="radio">
                        <label>
                            <input type="radio" value="option3" 
                                        checked={selectedOption === 3} 
                                        onChange={handleOptionChange} />
                            Mint New Tokens
                        </label>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
