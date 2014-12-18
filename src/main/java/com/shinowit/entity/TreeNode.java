package com.shinowit.entity;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Administrator on 2014-12-05.
 */
public class TreeNode {

    private TreeNode parent;

    private List<TreeNode> children=new ArrayList<TreeNode>();

    private TAuMenuInfo menu;

    public void addChild(TreeNode childNode){

        childNode.parent=this;
        children.add(childNode);
    }

    public TAuMenuInfo getMenu() {
        return menu;
    }

    public void setMenu(TAuMenuInfo menu) {
        this.menu = menu;
    }

    public List<TreeNode> getChildren() {
        return children;
    }

    public void setChildren(List<TreeNode> children) {
        this.children = children;
    }

    public boolean isLeaf(){
        return children.size()==0;
    }


}