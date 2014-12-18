package com.shinowit.service;

import com.shinowit.dao.BaseDAO;
import com.shinowit.entity.TMeInStockDetailsInfo;
import com.shinowit.entity.TMeInStockInfo;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * Created by Administrator on 2014/11/26.
 */
@Service
public class selectdelete {
    @Resource
    private BaseDAO<TMeInStockDetailsInfo> detaildao;
    @Resource
    private BaseDAO<TMeInStockInfo> instockdao;

    public boolean seldel(String arry[]){
        boolean result=false;
        try{
            for(String ss : arry){
                //判断明细中数据条数！
                int i=detaildao.queryRecordCount("select count(*) from TMeInStockDetailsInfo where TMeInStockInfoByBillCode.billCode=?",ss);
                if(i==0){
                    instockdao.executeHQL("delete from TMeInStockInfo where billCode=?",ss);
                    result = true;
                }
                else {


                }

            }

        }catch(Exception e){
            e.printStackTrace();
        }

        return result;
    }

}
